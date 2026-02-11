"use server";
import { db } from "@/config/db";
import { clickLogs, qrCodeTable, shortLinkTable } from "@/drizzle/schema";
import { getCurrentUser } from "../auth/auth.queries";
import { desc, eq, and, isNull, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getUserLinks = cache(async ({ limit = 5 }) => {
  const user = await getCurrentUser();
  if (!user) return [];

  return await db
    .select()
    .from(shortLinkTable)
    .where(
      and(
        eq(shortLinkTable.userId, user.id),
        isNull(shortLinkTable.deletedAt),
        eq(shortLinkTable.type, "link"),
      ),
    )
    .orderBy(desc(shortLinkTable.createdAt))
    .limit(limit);
});

export const getLinkDetails = cache(async (shortCode: string) => {
  const user = await getCurrentUser();
  if (!user) return redirect("/");

  const [res] = await db
    .select()
    .from(shortLinkTable)
    .where(
      and(
        eq(shortLinkTable.userId, user.id),
        eq(shortLinkTable.shortCode, shortCode),
        isNull(shortLinkTable.deletedAt),
      ),
    );
  return res;
});

export const getAllQr = cache(async () => {
  const user = await getCurrentUser();
  if (!user) return [];

  return await db
    .select({
      userId: shortLinkTable.userId,
      title: shortLinkTable.title,
      url: shortLinkTable.url,
      shortCode: shortLinkTable.shortCode,
      clicks: shortLinkTable.clicks,
      isActive: shortLinkTable.isActive,
      isHidden: shortLinkTable.isHidden,
      fgColor: qrCodeTable.fgColor,
      bgColor: qrCodeTable.bgColor,
      logoUrl: qrCodeTable.logoUrl,
    })
    .from(shortLinkTable)
    .where(
      and(
        eq(shortLinkTable.userId, user.id),
        isNull(shortLinkTable.deletedAt),
        eq(shortLinkTable.type, "qr"),
      ),
    )
    .innerJoin(qrCodeTable, eq(shortLinkTable.id, qrCodeTable.linkId))
    .orderBy(desc(shortLinkTable.createdAt));
});

export const getQrByShortCode = async (shortCode: string) => {
  const [res] = await db
    .select({
      userId: shortLinkTable.userId,
      linkId: shortLinkTable.id,
      title: shortLinkTable.title,
      url: shortLinkTable.url,
      shortCode: shortLinkTable.shortCode,
      clicks: shortLinkTable.clicks,
      isActive: shortLinkTable.isActive,
      isHidden: shortLinkTable.isHidden,
      createdAt: shortLinkTable.createdAt,
      type: shortLinkTable.type,
      fgColor: qrCodeTable.fgColor,
      bgColor: qrCodeTable.bgColor,
      logoUrl: qrCodeTable.logoUrl,
    })
    .from(shortLinkTable)
    .where(eq(shortLinkTable.shortCode, shortCode))
    .innerJoin(qrCodeTable, eq(shortLinkTable.id, qrCodeTable.linkId));

  return res;
};

// export const getAllData = async (userId: number) => {
//   const [res] = await db
//     .select({
//       userId: shortLinkTable.userId,
//       linkId: shortLinkTable.id,
//       title: shortLinkTable.title,
//       url: shortLinkTable.url,
//       shortCode: shortLinkTable.shortCode,
//       clicks: shortLinkTable.clicks,
//       isActive: shortLinkTable.isActive,
//       isHidden: shortLinkTable.isHidden,
//       createdAt: shortLinkTable.createdAt,
//       type: shortLinkTable.type,
//       fgColor: qrCodeTable.fgColor,
//       bgColor: qrCodeTable.bgColor,
//       logoUrl: qrCodeTable.logoUrl,
//     })
//     .from(shortLinkTable)
//     .where(eq(shortLinkTable.userId, userId))
//     .innerJoin(qrCodeTable, eq(shortLinkTable.id, qrCodeTable.linkId));

//   return res;
// };

// export const getClickLogs = async (linkId: number) => {
//   return await db
//     .select()
//     .from(clickLogs)
//     .where(eq(clickLogs.linkId, linkId))
//     .orderBy(desc(clickLogs.clickedAt)); // Latest scans first
// };

export const getUserGlobalAnalytics = async (userId: number) => {
  // 1. Get total clicks across all links
  const [totalStats] = await db
    .select({
      totalClicks: sql<number>`sum(${shortLinkTable.clicks})`,
      totalLinks: sql<number>`count(${shortLinkTable.id})`,
    })
    .from(shortLinkTable)
    .where(
      and(eq(shortLinkTable.userId, userId), isNull(shortLinkTable.deletedAt)),
    );

  // 2. Get all logs for all links belonging to this user
  const allLogs = await db
    .select({
      country: clickLogs.country,
      device: clickLogs.device,
      referrer: clickLogs.referrer,
      clickedAt: clickLogs.clickedAt,
      ipAddress: clickLogs.ipAddress,
    })
    .from(clickLogs)
    .innerJoin(shortLinkTable, eq(clickLogs.linkId, shortLinkTable.id))
    .where(eq(shortLinkTable.userId, userId))
    .orderBy(desc(clickLogs.clickedAt));

  return {
    stats: totalStats,
    logs: allLogs,
  };
};
