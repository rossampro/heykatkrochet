import { users } from "~/drizzle/schema";

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type CreateUserRequest = {
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    password: string,
    userType: string,
};
