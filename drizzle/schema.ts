import { relations } from "drizzle-orm";
import {
  int,
  mysqlTable,
  varchar,
  timestamp,
  text,
  boolean,
  decimal,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int().primaryKey().autoincrement(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  image: varchar({ length: 255 }),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
  plan: mysqlEnum("plan", ["free", "pro", "business"]).default("free"),
  linksCreated: int("links_created").default(0),
  qrsCreated: int("qrs_created").default(0),
  deletedAt: timestamp("deleted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const sessionTable = mysqlTable("sessions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: int("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  userAgent: text("user_agent").notNull(),
  ip: varchar("ip", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const shortLinkTable = mysqlTable("short_link", {
  id: int().autoincrement().primaryKey(),
  userId: int()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }),
  url: text().notNull(),
  shortCode: varchar("short_code", { length: 10 }).unique().notNull(),
  type: varchar("type", { length: 20 }).default("link").notNull(),
  clicks: int().default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  isHidden: boolean("is_hidden").default(false).notNull(),
  password: varchar({ length: 255 }),
  deletedAt: timestamp("deleted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const clickLogs = mysqlTable("click_logs", {
  id: int().primaryKey().autoincrement(),
  linkId: int()
    .notNull()
    .references(() => shortLinkTable.id, { onDelete: "cascade" }),
  ipAddress: varchar("ip_address", { length: 255 }),
  country: varchar("country", { length: 100 }).default("Unknown"),
  city: varchar("city", { length: 100 }).default("Unknown"),
  region: varchar("region", { length: 100 }).default("Unknown"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  device: varchar("device", { length: 50 }),
  referrer: varchar("referrer", { length: 255 }).default("Direct"),
  clickedAt: timestamp("clicked_at").defaultNow().notNull(),
});

export const qrCodeTable = mysqlTable("qr_codes", {
  id: int().primaryKey().autoincrement(),
  linkId: int()
    .notNull()
    .references(() => shortLinkTable.id, { onDelete: "cascade" }),
  userId: int()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  fgColor: varchar({ length: 7 }).default("#000000"),
  bgColor: varchar({ length: 7 }).default("#ffffff"),
  logoUrl: varchar({ length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// A user can have a multiple short link
// A user can have a multiple sessionTable
export const userRelations = relations(users, ({ many }) => ({
  shortLinks: many(shortLinkTable),
  sessions: many(sessionTable),
}));

// 2. ShortLink Relations (Defines what a link HAS or BELONGS TO)
// A shortlink belongs to a single user
export const shortLinksRelations = relations(
  shortLinkTable,
  ({ one, many }) => ({
    user: one(users, {
      fields: [shortLinkTable.userId],
      references: [users.id],
    }),
    analytics: many(clickLogs),
  }),
);

// Sessions Relations: A userId belongs to a single user
export const sessionsRelations = relations(sessionTable, ({ one }) => ({
  user: one(users, {
    fields: [sessionTable.userId],
    references: [users.id],
  }),
}));

// Click Log Relations: (Belongs to a link)
export const clickLogsRelations = relations(clickLogs, ({ one }) => ({
  link: one(shortLinkTable, {
    fields: [clickLogs.linkId],
    references: [shortLinkTable.id],
  }),
}));
