import { relations } from "drizzle-orm";
import {
  int,
  mysqlTable,
  varchar,
  timestamp,
  text,
  boolean,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int().primaryKey().autoincrement(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  deletedAt: timestamp("deleted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const sessionTable = mysqlTable("sessions", {
  id: varchar({ length: 255 }).primaryKey(),
  userId: int()
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
  url: text().notNull(),
  shortCode: varchar("short_code", { length: 10 }).unique().notNull(),
  clicks: int().default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  password: varchar({ length: 255 }),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const clickLogs = mysqlTable("click_logs", {
  id: int().primaryKey().autoincrement(),
  linkId: int()
    .notNull()
    .references(() => shortLinkTable.id, { onDelete: "cascade" }),
  ipAddress: varchar("ip_address", { length: 255 }), // For Unique Click tracking
  country: varchar("country", { length: 100 }).default("Unknown"),
  device: varchar("device", { length: 50 }),
  referrer: varchar("referrer", { length: 255 }).default("Direct"),
  clickedAt: timestamp("clicked_at").defaultNow().notNull(),
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
