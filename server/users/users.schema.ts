import { z } from "zod";

export const shortenerSchema = z.object({
  url: z
    .string("URL is required.")
    .trim()
    .url({ message: "Invalid URL" })
    .max(1024, "URL cannot be longer than 1024 characters."),
});

export type shortenerUserData = z.infer<typeof shortenerSchema>;

export const editLinkSchema = z.object({
  shortCode: z.string().min(6, "Short Code must be at least 6 characters"),
  title: z.string().max(100, "Title is too long").optional().or(z.literal("")),
});

export type EditFormData = z.infer<typeof editLinkSchema>;

export const passwordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type PasswordFormData = z.infer<typeof passwordSchema>;

export const createLinkSchema = z.object({
  url: z.string().url("Please enter a valid destination URL"),
  title: z.string().max(255, "Title is too long").optional().or(z.literal("")),
  // Maps to shortCode in your table (length: 10)
  shortCode: z
    .string()
    .min(3, "Min 3 characters")
    .max(10, "Max 10 characters")
    .regex(/^[a-zA-Z0-9_-]*$/, "Only alphanumeric, underscores, or hyphens")
    // .optional()
    .or(z.literal("")),
});

export type CreateLinkData = z.infer<typeof createLinkSchema>;
