// app/actions/analytics.ts
"use server";

import { db } from "@/config/db";
import { shortLinkTable, clickLogs } from "@/drizzle/schema";
import {
  eq,
  sql,
  count,
  desc,
  asc,
  countDistinct,
  and,
  isNull,
  gte,
} from "drizzle-orm";

export async function getUserAnalytics(userId: number) {
  // Shared SQL fragments to ensure SELECT and GROUP BY match exactly
  const dateExpr = sql`DATE_FORMAT(${clickLogs.clickedAt}, '%Y-%m-%d')`;

  // 1. Click Activity (Last 7 Days)
  const activity = await db
    .select({
      date: dateExpr,
      clicks: count(clickLogs.id),
    })
    .from(clickLogs)
    .innerJoin(shortLinkTable, eq(clickLogs.linkId, shortLinkTable.id))
    .where(eq(shortLinkTable.userId, userId))
    .groupBy(dateExpr) // Must use the expression, not the alias "date"
    .orderBy(asc(dateExpr));

  const countries = await db
    .select({
      name: clickLogs.country,
      value: count(clickLogs.id),
    })
    .from(clickLogs)
    .innerJoin(shortLinkTable, eq(clickLogs.linkId, shortLinkTable.id))
    .where(eq(shortLinkTable.userId, userId))
    .groupBy(clickLogs.country)
    .orderBy(desc(sql`count(${clickLogs.id})`)) // Order by the raw count expression
    .limit(5);

  // 3. Device Breakdown (Similar fix)
  const devices = await db
    .select({
      name: clickLogs.device,
      value: count(clickLogs.id),
    })
    .from(clickLogs)
    .innerJoin(shortLinkTable, eq(clickLogs.linkId, shortLinkTable.id))
    .where(eq(shortLinkTable.userId, userId))
    .groupBy(clickLogs.device);

  const [linkStats] = await db
    .select({
      totalClicks: sql<number>`sum(${shortLinkTable.clicks})`,
      totalLinks: sql<number>`count(${shortLinkTable.id})`,
    })
    .from(shortLinkTable)
    .where(
      and(eq(shortLinkTable.userId, userId), isNull(shortLinkTable.deletedAt)),
    );

  const [visitorStats] = await db
    .select({
      uniqueVisitors: countDistinct(clickLogs.ipAddress),
    })
    .from(clickLogs)
    .innerJoin(shortLinkTable, eq(clickLogs.linkId, shortLinkTable.id))
    .where(eq(shortLinkTable.userId, userId));

  const overview = {
    totalClicks: linkStats?.totalClicks || 0,
    totalLinks: linkStats?.totalLinks || 0,
    uniqueVisitors: visitorStats?.uniqueVisitors || 0,
  };

  const referrers = await db
    .select({
      name: clickLogs.referrer,
      value: count(clickLogs.id),
    })
    .from(clickLogs)
    .innerJoin(shortLinkTable, eq(clickLogs.linkId, shortLinkTable.id))
    .where(
      and(eq(shortLinkTable.userId, userId), isNull(shortLinkTable.deletedAt)),
    )
    .groupBy(clickLogs.referrer)
    .orderBy(desc(sql`count(${clickLogs.id})`))
    .limit(6);

  return { overview, activity, devices, countries, referrers };
}

export const qrAnalyticsAction = async (shortCode: string) => {
  const dateExpr = sql`DATE_FORMAT(${clickLogs.clickedAt}, '%Y-%m-%d')`;

  const twentyDaysAgo = new Date();
  twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);

  const res = await db
    .select({
      date: dateExpr,
      desktop: sql<number>`CAST(SUM(CASE WHEN ${clickLogs.device} = 'desktop' THEN 1 ELSE 0 END) AS UNSIGNED)`,
      mobile: sql<number>`CAST(SUM(CASE WHEN ${clickLogs.device} = 'mobile' THEN 1 ELSE 0 END) AS UNSIGNED)`,
      other: sql<number>`CAST(SUM(CASE WHEN ${clickLogs.device} NOT IN ('desktop', 'mobile') OR ${clickLogs.device} IS NULL THEN 1 ELSE 0 END) AS UNSIGNED)`,
    })
    .from(clickLogs)
    .innerJoin(shortLinkTable, eq(clickLogs.linkId, shortLinkTable.id))
    .where(
      and(
        eq(shortLinkTable.shortCode, shortCode),
        gte(clickLogs.clickedAt, twentyDaysAgo),
      ),
    )
    .groupBy(dateExpr)
    .orderBy(asc(dateExpr));

  return res;
};

export const linkAnalyticsAction = async (shortCode: string) => {
  const dateExpr = sql`DATE_FORMAT(${clickLogs.clickedAt}, '%Y-%m-%d')`;

  const twentyDaysAgo = new Date();
  twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);

  const res = await db
    .select({
      date: dateExpr,
      desktop: sql<number>`CAST(SUM(CASE WHEN ${clickLogs.device} = 'desktop' THEN 1 ELSE 0 END) AS UNSIGNED)`,
      mobile: sql<number>`CAST(SUM(CASE WHEN ${clickLogs.device} = 'mobile' THEN 1 ELSE 0 END) AS UNSIGNED)`,
      other: sql<number>`CAST(SUM(CASE WHEN ${clickLogs.device} NOT IN ('desktop', 'mobile') OR ${clickLogs.device} IS NULL THEN 1 ELSE 0 END) AS UNSIGNED)`,
    })
    .from(clickLogs)
    .innerJoin(shortLinkTable, eq(clickLogs.linkId, shortLinkTable.id))
    .where(
      and(
        eq(shortLinkTable.shortCode, shortCode),
        gte(clickLogs.clickedAt, twentyDaysAgo),
      ),
    )
    .groupBy(dateExpr)
    .orderBy(asc(dateExpr));

  return res;
};
