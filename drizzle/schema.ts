import { pgTable, smallserial, pgEnum, real, varchar, uniqueIndex } from "drizzle-orm/pg-core"

export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256']);

export const productSizes = pgEnum("size", ["tiny", "small", "medium", "large", "huge"]);

export const products = pgTable("products", {
    id: smallserial("id").primaryKey(),
    name: varchar("name").notNull(),
    description: varchar("description").notNull(),
    image: varchar("image").notNull(),
    templateCredit: varchar("template_credit"),
    price: real("price").notNull(),
    size: productSizes("size").notNull(),
},
    (products) => ({
        idIdx: uniqueIndex("id_idx").on(products.id),
        priceIdx: uniqueIndex("price_idx").on(products.price),
    })
);
