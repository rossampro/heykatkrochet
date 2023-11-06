import type { IPlushiePut } from "~/models/plushie";
import type { TursoDb } from "../utils/turso";
import { IPlushie } from "~/models/plushie";
import { products } from "~/drizzle/schema";
import { eq } from "drizzle-orm";

type UpdateSuccess = {
    updatedId: string
}

const updatePlushie = async (plushie: IPlushie, db: TursoDb): Promise<UpdateSuccess[]> => {
    const insertPlushie: IPlushiePut = {
        id: plushie.id,
        name: plushie.name,
        description: plushie.description,
        lowerPrice: plushie.lowerPrice,
        upperPrice: plushie.upperPrice === 0 ? null : plushie.upperPrice,
        size: plushie.size,
        quantity: plushie.quantity,
        templateCredit: plushie.templateCredit,
        updatedAt: Date.now()
    };

    try {
        return await db.update(products).set({
            name: insertPlushie.name,
            description: insertPlushie.description,
            lowerPrice: insertPlushie.lowerPrice,
            upperPrice: insertPlushie.upperPrice,
            size: insertPlushie.size,
            quantity: insertPlushie.quantity,
            templateCredit: insertPlushie.templateCredit,
            updatedAt: insertPlushie.updatedAt
        })
            .where(eq(products.id, insertPlushie.id))
            .returning({ updatedId: products.id });

    } catch (e) {
        throw createError({
            statusCode: 500,
            message: `Unable to update Product Id ${insertPlushie.id}`
        })

    }

}

export default defineEventHandler(async (event) => {
    const putRequest: IPlushie = await readBody(event);

    if (!putRequest || putRequest.id === "") {
        throw createError({
            statusCode: 400,
            message: `Bad Request, check Body or Product Id`
        })
    };

    const db = await useTurso();

    const updatedId = await updatePlushie(putRequest, db);

    return {
        statusCode: 200,
        message: `Successfully updated Product Id: ${updatedId[0].updatedId}`
    }
})
