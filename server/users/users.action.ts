"use server";
import { db } from "@/config/db";
import crypto from "crypto";
import { getCurrentUser } from "../auth/auth.queries";
import { redirect } from "next/navigation";
import { shortLinkTable } from "@/drizzle/schema";

export const shortLinkAction = async (formData: FormData) => {
  const user = await getCurrentUser();
  if (!user) return redirect("/");

  const url = formData.get("url") as string;
  if (!url) return { error: "URL is required" };

  const shortCode = crypto.randomBytes(6).toString("hex");
  console.log(shortCode);

  try {
    // 3. Insert into DB - MUST include the userId
    const [res] = await db.insert(shortLinkTable).values({
      userId: user.id,
      url: url,
      shortCode,
    });

    return {
      status: "success",
      message: "Short Link Generated",
      data: res,
    };
  } catch (error) {
    console.error("Failed to create link:", error);
    return { status: "error", message: "Something went wrong" };
  }
};
