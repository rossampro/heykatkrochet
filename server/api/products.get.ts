import { LibSQLDatabase } from "drizzle-orm/libsql";
import { products } from "~/drizzle/schema";
import type { IPlushie } from "~/models/plushie";
import * as schema from "~/drizzle/schema";
import { useTurso } from "../utils/turso";

async function getAllPlushies(db: LibSQLDatabase<typeof schema>): Promise<IPlushie[]> {
    const plushies = await db.select().from(products);
    return plushies as unknown as IPlushie[];
}

export default defineEventHandler(async (event) => {
    const db = await useTurso();
    try {
        const plushies = await getAllPlushies(db);
        console.log(`Get All Plushies: ${event.context}`);
        return plushies;
    } catch (e) {
        throw createError({
            message: `Failed to get all plushies: ${e}`,
            statusCode: 500,
        });
    }
});
