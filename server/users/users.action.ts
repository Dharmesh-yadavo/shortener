"use server";
import { db } from "@/config/db";
import crypto from "crypto";
import { getCurrentUser } from "../auth/auth.queries";
import { redirect } from "next/navigation";
import { qrCodeTable, shortLinkTable, users } from "@/drizzle/schema";
import {
  CreateLinkData,
  CreateQrData,
  createQrSchema,
  EditFormData,
  ProfileSettingsData,
  profileSettingsSchema,
  shortenerUserData,
  UpdatePasswordData,
  updatePasswordSchema,
} from "./users.schema";
import { and, eq, ne, sql } from "drizzle-orm";
import argon2 from "argon2";
import { revalidatePath } from "next/cache";
import { getLinkDetails } from "./users.query";

export const shortLinkAction = async (data: shortenerUserData) => {
  const user = await getCurrentUser();
  if (!user || !user.id) return redirect("/");

  const { url } = data;
  if (!url) return { error: "URL is required" };

  // console.log(user);

  const shortCode = crypto.randomBytes(4).toString("hex");

  const title = new URL(url).hostname.replace("www.", "");

  const limits = {
    free: 5,
    pro: 30,
    business: Number.MAX_SAFE_INTEGER,
  };

  const userPlan = (user.plan?.toLowerCase() || "free") as keyof typeof limits;
  const maxLinks = limits[userPlan];
  const currentLinks = user.linksCreated ?? 0;

  try {
    if (currentLinks < maxLinks) {
      return await db.transaction(async (tx) => {
        await tx
          .update(users)
          .set({ linksCreated: sql`${users.linksCreated} + 1` })
          .where(eq(users.id, user.id));

        await tx.insert(shortLinkTable).values({
          userId: user.id,
          title,
          url: url,
          shortCode,
        });

        return {
          status: "success",
          message: "Short Link Generated",
          data: {
            shortCode: shortCode,
            url: url,
          },
        };
      });
    } else {
      return {
        status: "error",
        message:
          "You've reached your plan's Short Link limit. Upgrade to create more!",
      };
    }
  } catch (error) {
    console.error("Failed to create link:", error);
    return { status: "error", message: "Something went wrong" };
  }
};

export const editLinkAction = async (
  data: EditFormData,
  originalShortCode: string,
) => {
  // 1. Check if the NEW shortCode is already taken by ANOTHER record
  const [existingCode] = await db
    .select()
    .from(shortLinkTable)
    .where(
      and(
        eq(shortLinkTable.shortCode, data.shortCode), // Same as the new input
        ne(shortLinkTable.shortCode, originalShortCode), // But NOT the one we are currently editing
      ),
    );

  if (existingCode) {
    return {
      status: "error",
      message: "This shortCode is already taken by another link.",
    };
  }

  // 2. Proceed with update
  try {
    await db
      .update(shortLinkTable)
      .set({
        shortCode: data.shortCode,
        title: data.title,
        updatedAt: sql`NOW()`, // Tip: lower case 'now()' is standard for Postgres
      })
      .where(eq(shortLinkTable.shortCode, originalShortCode));

    return {
      status: "success",
      message: "Short Link Updated Successfully",
    };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Something went wrong during update" };
  }
};

export const handleDeleteAction = async (originalShortCode: string) => {
  try {
    await db
      .update(shortLinkTable)
      .set({
        deletedAt: sql`NOW()`, // Mark it as deleted
        isActive: false, // Optional: disable it too
      })
      .where(eq(shortLinkTable.shortCode, originalShortCode));
    return {
      status: "success",
      message: "Short Link Deleted Successfully",
    };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Something went wrong during deletion" };
  }
};

export const toggleLinkVisibility = async (
  originalShortCode: string,
  currentState: boolean,
) => {
  try {
    await db
      .update(shortLinkTable)
      .set({
        isHidden: !currentState,
        updatedAt: sql`NOW()`,
      })
      .where(eq(shortLinkTable.shortCode, originalShortCode));

    return {
      status: "success",
      message: `Link is now ${!currentState ? "hidden" : "visible"}`,
    };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Something went wrong" };
  }
};

export const setLinkPasswordAction = async (
  shortCode: string,
  password: string | null,
) => {
  try {
    let finalPassword = null;

    if (password && password.trim() !== "") {
      finalPassword = await argon2.hash(password);
    }

    await db
      .update(shortLinkTable)
      .set({
        password: finalPassword,
        updatedAt: sql`NOW()`,
      })
      .where(eq(shortLinkTable.shortCode, shortCode));

    revalidatePath(`/dashboard/links/${shortCode}`);

    return { status: "success", message: "Security settings updated" };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Failed to set password" };
  }
};

export const verifyLinkPasswordAction = async (
  shortCode: string,
  inputPassword: string,
) => {
  console.log(inputPassword);
  try {
    const link = await getLinkDetails(shortCode);

    if (!link || !link.password) {
      return { success: false, error: "Link not found or no password set." };
    }

    const isValid = await argon2.verify(link.password, inputPassword);

    if (isValid) {
      return { success: true };
    } else {
      return { success: false, error: "Incorrect password." };
    }
  } catch (error) {
    console.error("Verification error:", error);
    return { success: false, error: "An internal error occurred." };
  }
};

export const createLinkAction = async (
  data: CreateLinkData,
  userId: number,
) => {
  try {
    const user = await getCurrentUser();
    if (!user || !user.id) return redirect("/");

    const limits = {
      free: 5,
      pro: 30,
      business: Number.MAX_SAFE_INTEGER,
    };

    const userPlan = (user.plan?.toLowerCase() ||
      "free") as keyof typeof limits;
    const maxLinks = limits[userPlan];
    const currentLinks = user.linksCreated ?? 0;

    if (currentLinks < maxLinks) {
      return await db.transaction(async (tx) => {
        await tx
          .update(users)
          .set({ linksCreated: sql`${users.linksCreated} + 1` })
          .where(eq(users.id, userId));

        await tx.insert(shortLinkTable).values({
          userId: userId,
          title: data.title,
          url: data.url,
          shortCode: data.shortCode,
        });

        return {
          status: "success",
          message: "Short Link created successfully",
        };
      });
    } else {
      return {
        status: "error",
        message:
          "You've reached your plan's link limit. Upgrade to create more!",
      };
    }
  } catch (error) {
    console.error("Failed to create link:", error);
    return { status: "error", message: "Something went wrong" };
  }
};

export const profileSettingAction = async ({
  data,
  userId,
}: {
  data: ProfileSettingsData;
  userId: number;
}) => {
  try {
    const result = profileSettingsSchema.safeParse(data);

    if (!result.success) {
      return {
        status: "error",
        message: result.error.issues[0].message,
      };
    }

    const { name, email } = result.data;

    await db
      .update(users)
      .set({
        name: name,
        email: email,
      })
      .where(eq(users.id, userId));

    return {
      status: "success",
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "An unexpected error occurred while updating your profile",
    };
  }
};

//!
// export const updatePasswordAction = async ({
//   data,
//   userId,
// }: {
//   data: UpdatePasswordData;
//   userId: number;
// }) => {
//   try {
//     const result = updatePasswordSchema.safeParse(data);
//     if (!result.success)
//       return { status: "error", message: result.error.issues[0].message };

//     const { currentPassword, newPassword } = result.data;

//     const [user] = await db
//       .select()
//       .from(users)
//       .where(eq(users.id, userId))
//       .limit(1);

//     const isMatch = await argon2.verify(user.password!, currentPassword);
//     if (!isMatch)
//       return { status: "error", message: "Incorrect current password" };

//     const hashedPassword = await argon2.hash(newPassword);

//     await db
//       .update(users)
//       .set({ password: hashedPassword })
//       .where(eq(users.id, userId));

//     return { status: "success", message: "Password updated successfully" };
//   } catch (error) {
//     console.error(error);
//     return { status: "error", message: "Failed to update password" };
//   }
// };

export const updatePasswordAction = async ({
  data,
  userId,
}: {
  data: UpdatePasswordData;
  userId: number;
}) => {
  try {
    const user = await getCurrentUser();
    if (!user) return { status: "error", message: "User not found" };

    const hasExistingPassword = !!user.password;

    // 1. Verify current password ONLY if they already have one
    if (hasExistingPassword) {
      if (!data.currentPassword) {
        return {
          status: "error",
          message: "Current password is required to make changes",
        };
      }
      const isValid = await argon2.verify(user.password!, data.currentPassword);
      if (!isValid)
        return { status: "error", message: "Incorrect current password" };
    }

    // 2. Hash new password with Argon2
    const hashedPassword = await argon2.hash(data.newPassword);

    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, userId));

    return {
      status: "success",
      message: hasExistingPassword ? "Password updated!" : "Password created!",
    };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Internal server error" };
  }
};

export const deleteAccountAction = async (userId: number) => {
  try {
    //
    await db.delete(users).where(eq(users.id, userId));

    return { status: "success", message: "Account deleted" };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Could not delete account" };
  }
};

//! Qr code :

export const qrCodeAction = async (data: shortenerUserData) => {
  const user = await getCurrentUser();
  if (!user || !user.id) return redirect("/");

  const { url } = data;
  if (!url) return { status: "error", message: "URL is required" };

  let title = "New Link";
  try {
    title = new URL(url).hostname.replace("www.", "");
  } catch (e) {
    console.error(e);
    return { status: "error", message: "Invalid URL format" };
  }

  const shortCode = crypto.randomBytes(4).toString("hex");

  const limits = {
    free: 5,
    pro: 30,
    business: Number.MAX_SAFE_INTEGER,
  };

  const userPlan = (user.plan?.toLowerCase() || "free") as keyof typeof limits;
  const maxQrs = limits[userPlan];
  const currentQrs = user.qrsCreated ?? 0;

  try {
    if (currentQrs < maxQrs) {
      return await db.transaction(async (tx) => {
        await tx
          .update(users)
          .set({ qrsCreated: sql`${users.qrsCreated} + 1` })
          .where(eq(users.id, user.id));

        const [res] = await tx.insert(shortLinkTable).values({
          userId: user.id,
          title: title,
          url: url,
          shortCode,
          type: "qr",
        });

        const insertedLinkId = res.insertId;

        await tx.insert(qrCodeTable).values({
          userId: user.id,
          linkId: insertedLinkId,
        });

        return {
          status: "success",
          message: "Qr Code Generated Successfully",
          data: {
            shortCode: shortCode,
            url: url,
          },
        };
      });
    } else {
      return {
        status: "error",
        message: "You've reached your plan's QR limit. Upgrade to create more!",
      };
    }
  } catch (error) {
    console.error("Failed to create Qr Code:", error);
    return { status: "error", message: "Something went wrong" };
  }
};

export const updateQrAction = async ({
  shortCode,
  title,
}: {
  shortCode: string;
  title: string;
}) => {
  try {
    await db
      .update(shortLinkTable)
      .set({ title: title })
      .where(eq(shortLinkTable.shortCode, shortCode));

    return {
      status: "success",
      message: "Title Updated Successfully",
    };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Something went wrong" };
  }
};

export const updateQrCustomizationAction = async ({
  linkId,
  fgColor,
  bgColor,
  logoUrl,
}: {
  linkId: number;
  fgColor: string;
  bgColor: string;
  logoUrl: string;
}) => {
  try {
    await db
      .update(qrCodeTable)
      .set({ fgColor, bgColor, logoUrl })
      .where(eq(qrCodeTable.linkId, linkId));
    return {
      status: "success",
      message: "QR customization Updated Successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Failed to save customization",
    };
  }
};

export const createQrAction = async ({ data }: { data: CreateQrData }) => {
  const user = await getCurrentUser();
  if (!user || !user.id) return redirect("/");

  const { data: validateData, error } = createQrSchema.safeParse(data);
  if (error) return { status: "error", message: error.issues[0].message };

  const { title, url, bgColor, fgColor, logoUrl } = validateData;

  const shortCode = crypto.randomBytes(4).toString("hex");

  const limits = {
    free: 5,
    pro: 30,
    business: Number.MAX_SAFE_INTEGER,
  };

  const userPlan = (user.plan?.toLowerCase() || "free") as keyof typeof limits;
  const maxQrs = limits[userPlan];
  const currentQrs = user.qrsCreated ?? 0;

  try {
    if (currentQrs < maxQrs) {
      return await db.transaction(async (tx) => {
        await tx
          .update(users)
          .set({ qrsCreated: sql`${users.qrsCreated} + 1` })
          .where(eq(users.id, user.id));

        const [linkRes] = await tx.insert(shortLinkTable).values({
          userId: user.id,
          title: title || "QR Code Link",
          url: url,
          shortCode,
          type: "qr",
        });

        await tx.insert(qrCodeTable).values({
          userId: user.id,
          linkId: linkRes.insertId,
          bgColor: bgColor || "#ffffff",
          fgColor: fgColor || "#000000",
          logoUrl: logoUrl || null,
        });

        return {
          status: "success",
          message: "QR Code Generated Successfully",
          data: { shortCode, url },
        };
      });
    } else {
      return {
        status: "error",
        message: "You've reached your plan's QR limit. Upgrade to create more!",
      };
    }
  } catch (error) {
    console.error("Failed to create QR Code:", error);
    return { status: "error", message: "Something went wrong" };
  }
};

export const qrCodeCreationInLink = async ({
  url,
  shortCode,
  linkId,
}: {
  url: string;
  shortCode: string;
  linkId: number;
}) => {
  const user = await getCurrentUser();
  if (!user || !user.id) return redirect("/");

  const limits = {
    free: 5,
    pro: 30,
    business: Number.MAX_SAFE_INTEGER,
  };

  const userPlan = (user.plan?.toLowerCase() || "free") as keyof typeof limits;
  const maxQrs = limits[userPlan];
  const currentQrs = user.qrsCreated ?? 0;

  try {
    if (currentQrs < maxQrs) {
      return await db.transaction(async (tx) => {
        await tx
          .update(users)
          .set({ qrsCreated: sql`${users.qrsCreated} + 1` })
          .where(eq(users.id, user.id));

        await tx
          .update(shortLinkTable)
          .set({ hasQr: true })
          .where(eq(shortLinkTable.shortCode, shortCode));

        await tx.insert(qrCodeTable).values({
          userId: user.id,
          linkId: linkId,
        });

        return {
          status: "success",
          message: "Qr Code Generated Successfully",
          data: {
            shortCode: shortCode,
            url: url,
          },
        };
      });
    } else {
      return {
        status: "error",
        message: "You've reached your plan's QR limit. Upgrade to create more!",
      };
    }
  } catch (error) {
    console.error("Failed to create Qr Code:", error);
    return { status: "error", message: "Something went wrong" };
  }
};
