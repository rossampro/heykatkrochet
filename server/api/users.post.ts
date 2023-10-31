import type { CreateUserRequest, InsertUser } from "~/models/users";
import type { InsertPassword } from "~/models/passwords";
import type { TursoDb } from "../utils/turso";
import { passwords, users } from "~/drizzle/schema";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const createUser = async (db: TursoDb, user: CreateUserRequest): Promise<string> => {
    const insertUser: InsertUser = {
        id: uuidv4(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };

    const result = await db.insert(users).values(insertUser).returning({ insertedId: users.id });

    return result[0].insertedId;
}

const createPassword = async (db: TursoDb, userId: string, password: string) => {
    const passwordHash = await bcrypt.hash(password, 2);
    const insertPassword: InsertPassword = {
        hash: passwordHash,
        userId: userId
    };

    await db.insert(passwords).values(insertPassword);
}

export default defineEventHandler(async (event) => {
    const userRequest: CreateUserRequest = await readBody(event);
    const db = await useTurso();

    const userId = await createUser(db, userRequest);
    await createPassword(db, userId, userRequest.password);

    setResponseStatus(event, 201);
    return {
        status: "success",
        statusCode: 201,
        message: `User created: ${userId}`
    };
});
