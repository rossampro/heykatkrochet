import { LibSQLDatabase } from "drizzle-orm/libsql";
import { images } from "~/drizzle/schema";
import type { IImage } from "~/models/images";
import * as schema from "~/drizzle/schema";
import { useTurso } from "~/server/utils/turso";
import { eq } from "drizzle-orm";

const getImagesPerProduct = async (db: LibSQLDatabase<typeof schema>, productId: string): Promise<IImage[]> => {
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
    const productId = getRouterParam(event, "productId");

    if (!productId) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing productId"
        });
    }

    const imageList = await getImagesPerProduct(db, productId);

    if (imageList.length === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: `No images found for product ${productId}`
        });
    }

    return imageList;
});

