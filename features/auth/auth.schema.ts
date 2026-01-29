import { z } from "zod";

export const registerUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 char long")
    .max(255, "Name must not exceed 255 characters"),

  email: z
    .email("Please enter a valid email address ")
    .trim()
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number",
    ),
});

export type RegisterUserData = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z
    .email("Please enter a valid email address ")
    .trim()
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase(),

  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type LoginUserData = z.infer<typeof loginUserSchema>;
