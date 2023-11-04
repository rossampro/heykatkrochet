import { LibSQLDatabase, drizzle } from 'drizzle-orm/libsql';
import * as schema from '~/drizzle/schema';
import { Client, createClient } from '@libsql/client';

export type TursoDb = LibSQLDatabase<typeof schema>;

export async function useTurso(): Promise<TursoDb> {
    const config = useRuntimeConfig().turso;

    const client: Client = await new Promise((resolve, reject) => {
        const client = createClient({
            url: config.dbUrl,
            authToken: config.dbAuthToken
        });

        if (!client) {
            reject("Failed to create client");
        }

        resolve(client);
    })

    return drizzle(client, { schema });
}
