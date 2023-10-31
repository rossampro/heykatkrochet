import { passwords } from '~/drizzle/schema';

export type InsertPassword = typeof passwords.$inferInsert;
