import { LibSQLDatabase } from "drizzle-orm/libsql";
import { users, passwords } from "~/drizzle/schema";
import bcrypt from "bcryptjs";
import { LoginCredentials } from "~/models/authentication";
import * as schema from "~/drizzle/schema";

const getUser = async (db: LibSQLDatabase<typeof schema>, email: string) => {
    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email),
        with: {
            password: true
        },
    });

    if (!user) {
        throw createError({
            statusCode: 404,
            message: "User not found"
        });
    }

    return user;
};

const comparePassword = (password: string, hash: string): boolean => {
    return bcrypt.compareSync(password, hash);
}



export default defineEventHandler(async (event) => {
    const loginRequest: LoginCredentials = await readBody(event);
    const db = await useTurso();

    const user = await getUser(db, loginRequest.email);

    const areMatch = comparePassword(loginRequest.password, user.password.hash);

    if (!areMatch) {
        throw createError({
            statusCode: 401,
            message: "Invalid password"
        });
    }

    return { id: user.id, type: user.userType };
});
