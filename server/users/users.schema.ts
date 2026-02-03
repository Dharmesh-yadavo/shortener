import { z } from "zod";

export const shortenerSchema = z.object({
  url: z
    .string("URL is required.")
    .trim()
    .url({ message: "Invalid URL" })
    .max(1024, "URL cannot be longer than 1024 characters."),
});

export type shortenerUserData = z.infer<typeof shortenerSchema>;
