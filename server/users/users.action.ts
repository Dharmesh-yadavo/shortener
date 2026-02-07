"use server";
import { db } from "@/config/db";
import crypto from "crypto";
import { getCurrentUser } from "../auth/auth.queries";
import { redirect } from "next/navigation";
import { shortLinkTable } from "@/drizzle/schema";
import {
  CreateLinkData,
  EditFormData,
  shortenerUserData,
} from "./users.schema";
import { and, eq, ne, sql } from "drizzle-orm";
import argon2 from "argon2";
import { revalidatePath } from "next/cache";

export const shortLinkAction = async (data: shortenerUserData) => {
  const user = await getCurrentUser();
  if (!user || !user.id) return redirect("/");

  const { url } = data;
  if (!url) return { error: "URL is required" };

  const shortCode = crypto.randomBytes(4).toString("hex");
  console.log(shortCode);

  const title = new URL(url).hostname.replace("www.", "");

  try {
    await db.insert(shortLinkTable).values({
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

export const createLinkAction = async (
  data: CreateLinkData,
  userId: number,
) => {
  console.log(data);

  try {
    await db.insert(shortLinkTable).values({
      userId: userId,
      title: data.title,
      url: data.url,
      shortCode: data.shortCode,
    });

    return {
      status: "success",
      message: "Short Link created successfully",
    };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Failed to create link" };
  }
};
