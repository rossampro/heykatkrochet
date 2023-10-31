import { LibSQLDatabase } from "drizzle-orm/libsql";
import { images } from "~/drizzle/schema";
import type { IImage, IImageGetRequest } from "~/models/images";
import type { TursoDb } from "~/server/utils/turso";
import { useTurso } from "~/server/utils/turso";
import { eq } from "drizzle-orm";

const getImagesPerProduct = async (db: TursoDb, productId: string): Promise<IImage[]> => {
    try {
        const imageList = await db.select().from(images).where(eq(images.productId, productId));
        return imageList as unknown as IImage[];
    } catch (e) {
        throw createError({
            statusCode: 500,
            statusMessage: `Failed to get images for product ${productId}, ${e}`
        });
    }
}

export default defineEventHandler(async (event) => {
    const db = await useTurso();
    const query: IImageGetRequest = getQuery(event);

    if (!query) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing productId"
        });
    }

    const imageList = await getImagesPerProduct(db, query.productId);

    if (imageList.length === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: `No images found for product ${query}`
        });
    }

    return imageList;
});

