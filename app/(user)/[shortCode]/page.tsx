"use server";
import { db } from "@/config/db";
import { clickLogs, shortLinkTable } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { redirect, notFound } from "next/navigation";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import PasswordGate from "@/components/user/dashboard/links/PasswordGate";

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

  if (link.password) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <PasswordGate shortCode={shortCode} originalUrl={link.url} />
      </div>
    );
  }

  // 2. Extract detailed analytics data
  const ip = headerList.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const referrer = headerList.get("referer") || "Direct";
  const deviceType = device.type || "desktop";

  const country = headerList.get("x-vercel-ip-country") || "Unknown";
  const city = headerList.get("x-vercel-ip-city") || "Unknown";
  const region = headerList.get("x-vercel-ip-country-region") || "Unknown";
  const latitude = headerList.get("x-vercel-ip-latitude") || "unknown";
  const longitude = headerList.get("x-vercel-ip-longitude") || "unknown";

  // 3. Update clicks and log data in parallel
  await db.transaction(async (tx) => {
    // Update link click count
    await tx
      .update(shortLinkTable)
      .set({ clicks: sql`${shortLinkTable.clicks} + 1` })
      .where(eq(shortLinkTable.id, link.id));

    // Log the click details
    await tx.insert(clickLogs).values({
      linkId: link.id,
      ipAddress: ip,
      country: country,
      city: city,
      region: region,
      latitude: latitude,
      longitude: longitude,
      device: deviceType,
      referrer: referrer,
    });
  });

  // 4. Redirect
  redirect(link.url);
}
