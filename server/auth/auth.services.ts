import { db } from "@/config/db";
import { oauthAccountsTable, users } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function getUserWithOauthId({
  email,
  provider,
}: {
  email: string;
  provider: "google";
}) {
  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      providerAccountId: oauthAccountsTable.providerAccountId,
      provider: oauthAccountsTable.provider,
    })
    .from(users)
    .where(eq(users.email, email))
    .leftJoin(
      oauthAccountsTable,
      and(
        eq(oauthAccountsTable.provider, provider),
        eq(oauthAccountsTable.userId, users.id),
      ),
    );

  return user;
}

export async function linkUserWithOauth({
  userId,
  provider,
  providerAccountId,
}: {
  userId: number;
  provider: "google";
  providerAccountId: string;
}) {
  await db.insert(oauthAccountsTable).values({
    userId,
    provider,
    providerAccountId,
  });
}

export async function createUserWithOauth({
  name,
  email,
  provider,
  providerAccountId,
}: {
  name: string;
  email: string;
  provider: "google";
  providerAccountId: string;
}) {
  const user = await db.transaction(async (trx) => {
    const [user] = await trx
      .insert(users)
      .values({
        email,
        name,
        password: "",
      })
      .$returningId();

    await trx.insert(oauthAccountsTable).values({
      provider,
      providerAccountId,
      userId: user.id,
    });

    return {
      id: user.id,
      name,
      email,
      provider,
      providerAccountId,
    };
  });

  return user;
}
