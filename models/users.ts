import { users } from "~/drizzle/schema";

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
