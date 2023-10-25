import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";
dotenv.config();

export default {
    schema: "",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.SUPABASE_CONNECTION_STRING
    }
} satisfies Config;
