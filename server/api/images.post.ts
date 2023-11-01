import { images } from "~/drizzle/schema";
import type { IImage, IImagePostRequest, IImagePostResponse } from "~/models/images";
import { ImageErrorResponse } from "~/models/errors";
import { useTurso } from "~/server/utils/turso";
import { v4 as uuidv4 } from "uuid";
import type { TursoDb } from "~/server/utils/turso";

const createImage = async (db: TursoDb, imageToCreate: IImagePostRequest) => {
  const iImage: IImage = {
    id: uuidv4(),
    name: imageToCreate.name,
    productId: imageToCreate.productId,
  };

  try {
    return await db.insert(images).values(iImage).returning({ insertedId: images.id });
  } catch (e) {
    throw new ImageErrorResponse(500, "Failed to create image");
  }
};

export default defineEventHandler(async (event) => {
  const db = await useTurso();
  try {
    const body: IImagePostRequest = await readBody(event);
    const imageId = await createImage(db, body);

    setResponseStatus(event, 201);

    const response: IImagePostResponse = {
      id: imageId[0].insertedId,
      status: 201,
      statusMessage: "Created image"
    };

    return response;

  } catch (e) {
    if (e instanceof ImageErrorResponse) {
      throw createError({
        status: 500,
        statusMessage: e.message
      })
    }
  }
})

