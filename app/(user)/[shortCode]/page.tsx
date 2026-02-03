import { db } from "@/config/db";
import { shortLinkTable, clickLogs } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { redirect, notFound } from "next/navigation";
import { headers } from "next/headers";
import { userAgent } from "next/server"; // Built-in Next.js helper

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) {
  const { shortCode } = await params;
  const headerList = await headers();
  const { device } = userAgent({ headers: headerList });

  // 1. Fetch the link
  const [link] = await db
    .select()
    .from(shortLinkTable)
    .where(eq(shortLinkTable.shortCode, shortCode))
    .limit(1);

  if (!link || !link.url) return notFound();

  // 2. Extract detailed analytics data
  const ip = headerList.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const referrer = headerList.get("referer") || "Direct";
  const country = headerList.get("x-vercel-ip-country") || "Unknown"; // works on vercel devlopment
  const deviceType = device.type || "desktop";

  // 3. Update clicks and log data in parallel
  await Promise.all([
    db
      .update(shortLinkTable)
      .set({ clicks: sql`${shortLinkTable.clicks} + 1` })
      .where(eq(shortLinkTable.id, link.id)),

    db.insert(clickLogs).values({
      linkId: link.id,
      ipAddress: ip,
      country: country,
      device: deviceType,
      referrer: referrer,
    }),
  ]);

  // 4. Redirect
  redirect(link.url);
}
