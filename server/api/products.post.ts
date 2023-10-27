import { LibSQLDatabase } from "drizzle-orm/libsql";
import { products } from "~/drizzle/schema";
import type { IPlushie, IPlushiePost, IPlushiePostResponse } from "~/models/plushie";
import * as schema from "~/drizzle/schema";
import { useTurso } from "../utils/turso";
import { PlushieErrorResponse } from "~/models/errors";
import { v4 as uuidv4 } from "uuid";

const createPlushie = async (plushie: IPlushiePost, db: LibSQLDatabase<typeof schema>) => {
    const plushieToInsert: IPlushie = {
        id: uuidv4(),
        name: plushie.name,
        description: plushie.description,
        price: plushie.price,
        image: plushie.image,
        size: plushie.size,
        quantity: plushie.quantity,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }

    try {
        return await db.insert(products).values(plushieToInsert).returning({ insertedId: products.id });
    } catch (e) {
        const errorResponse = new PlushieErrorResponse(500, `Error creating plushie: ${e}`);

        throw errorResponse;
    }
}

export default defineEventHandler(async (event) => {
    const db = await useTurso();
    try {
        const plushie: IPlushiePost = await readBody(event);
        const result = await createPlushie(plushie, db);

        const response: IPlushiePostResponse = {
            id: result[0].insertedId,
            status: 201,
            message: `Plushie created successfully: ${result[0].insertedId}`
        };

        return response;
    } catch (e) {
        if (e instanceof PlushieErrorResponse) {
            return e;
        } else {
            const errorResponse = new PlushieErrorResponse(400, `Bad Product Request: ${e}`);
            return errorResponse;
        }
    }
});
