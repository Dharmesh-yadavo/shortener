"use server";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import argon2 from "argon2";
import { eq } from "drizzle-orm";
import {
  LoginUserData,
  loginUserSchema,
  RegisterUserData,
  registerUserSchema,
} from "../auth.schema";
import {
  createSessionAndSetCookies,
  invalidateSession,
} from "./use-cases/sessions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

export const registrationAction = async (data: RegisterUserData) => {
  try {
    const { data: validateData, error } = registerUserSchema.safeParse(data);
    if (error) return { status: "error", message: error.issues[0].message };

    const { name, email, password } = validateData;

    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (user) {
      return { status: "error", message: "Email Already Exists" };
    }

    const hashPassword = await argon2.hash(password);

    const [res] = await db
      .insert(users)
      .values({ name, email, password: hashPassword });

    await createSessionAndSetCookies(res.insertId);

    return {
      status: "success",
      message: "Registration successful.",
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Registration failed.",
    };
  }
};

export const LoginFormAction = async (data: LoginUserData) => {
  try {
    const { data: validateData, error } = loginUserSchema.safeParse(data);
    if (error) return { status: "ERROR", message: error.issues[0].message };

    const { email, password } = validateData;

    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return { status: "error", message: "Invalid Email or Password" };
    }

    const isValidPassword = argon2.verify(user.password, password);

    if (!isValidPassword) {
      return { status: "error", message: "Invalid Email or Password" };
    }

    await createSessionAndSetCookies(user.id);

    return {
      status: "success",
      message: "Login Successful",
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Registration failed.",
    };
  }
};

// log out

export const logoutUserAction = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) return redirect("/login");
  console.log(session);

  const hashedToken = crypto
    .createHash("sha-256")
    .update(session)
    .digest("hex");

  await invalidateSession(hashedToken);
  cookieStore.delete("session");

  return redirect("/login");
};
