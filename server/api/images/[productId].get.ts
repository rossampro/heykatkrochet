import { images } from "~/drizzle/schema";
import type { TursoDb } from "~/server/utils/turso";
import type { IImage } from "~/models/images";
import { useTurso } from "~/server/utils/turso";
import { eq } from "drizzle-orm";

const getImagePerProduct = async (db: TursoDb, productId: string): Promise<IImage> => {
    try {
        const image = await db.query.images.findFirst({
            where: eq(images.productId, productId)
        });

        if (!image) {
            throw createError({
                statusCode: 404,
                message: "Image not found. Verify productId is correct."
            });
        }

        return image as unknown as IImage;

    } catch (error) {
        throw createError({
            statusCode: 500,
            message: "Failed to get image"
        })
    }
}

export default defineEventHandler(async (event) => {
    const productId = getRouterParam(event, 'productId')

    if (!productId) {
        throw createError({
            statusCode: 400,
            message: "Bad request, must provide productId"
        })
    };

    const db = await useTurso();
    return getImagePerProduct(db, productId);
})
