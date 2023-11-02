import { LibSQLDatabase } from "drizzle-orm/libsql";
import { ne } from "drizzle-orm";
import type { IPlushie } from "~/models/plushie";
import * as schema from "~/drizzle/schema";
import { useTurso } from "../utils/turso";

async function getAllPlushies(db: LibSQLDatabase<typeof schema>): Promise<IPlushie[]> {
  const plushies = await db.query.products.findMany({
    with: {
      images: true,
    },
  });

  const filteredPlushies = plushies.filter((plushie) => plushie.images.length !== 0);

  return filteredPlushies as unknown as IPlushie[];
}

export default defineEventHandler(async () => {
  const db = await useTurso();
  try {
    const plushies = await getAllPlushies(db);
    return plushies;
  } catch (e) {
    throw createError({
      message: `Failed to get all plushies: ${e}`,
      statusCode: 500,
    });
  }
});
