import { LibSQLDatabase, drizzle } from 'drizzle-orm/libsql';
import * as schema from '~/drizzle/schema';
import { createClient } from '@libsql/client';

export async function useTurso() {
    const config = useRuntimeConfig().turso;
    const client = createClient({
        url: config.dbUrl,
        authToken: config.dbAuthToken
    });

    return drizzle(client, { schema });
}
