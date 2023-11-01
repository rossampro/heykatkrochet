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
    lowerPrice: plushie.lowerPrice,
    upperPrice: plushie.upperPrice === 0 ? null : plushie.upperPrice,
    size: plushie.size,
    quantity: plushie.quantity,
    templateCredit: plushie.templateCredit,
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

    setResponseStatus(event, 201);
    console.log(response);
    return response;
  } catch (e) {
    if (e instanceof PlushieErrorResponse) {
      throw createError({
        statusCode: e.status,
        statusMessage: e.message
      });
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: `Bad Plushie Request: ${e}`
      });
    }
  }
});
