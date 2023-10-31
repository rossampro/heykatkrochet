import { relations, sql } from 'drizzle-orm';
import {
    index,
    integer,
    real,
    sqliteTable,
    text,
    uniqueIndex,
} from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    lowerPrice: real("lowerPrice").notNull(),
    upperPrice: real("upperPrice"),
    size: text("size").notNull(),
    quantity: integer("quantity").notNull(),
    templateCredit: text("template_credit").default(""),
    createdAt: integer("created_at").default(sql`(cast (unixepoch () as int))`),
    updatedAt: integer("updated_at").default(sql`(cast (unixepoch () as int))`),
},
    (products) => ({
        idIdx: uniqueIndex("id_idx").on(products.id),
    })
);

export const productRelations = relations(products, ({ many }) => ({
    images: many(images),
}))

export const images = sqliteTable('images', {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    productId: text("productId").notNull().references(() => products.id),
},
    (images) => ({
        idIdx: uniqueIndex("image_id_idx").on(images.id),
        productIdIdx: index("product_id_idx").on(images.productId),
    })
);

export const imageRelations = relations(images, ({ one }) => ({
    product: one(products, {
        fields: [images.productId],
        references: [products.id]
    }),
}));

export const users = sqliteTable('users', {
    id: text("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    address: text("address"),
    phone: text("phone"),
    createdAt: integer("created_at").default(sql`(cast (unixepoch () as int))`),
    updatedAt: integer("updated_at").default(sql`(cast (unixepoch () as int))`),
},
    (users) => ({
        emailIdx: uniqueIndex("email_idx").on(users.email),
        firstNameLastNameAddressIdx: index("first_name_last_name_address_idx").on(
            users.firstName,
            users.lastName,
            users.address
        ),
    })
);

export const userRelations = relations(users, ({ one }) => ({
    password: one(passwords, {
        fields: [users.id],
        references: [passwords.userId]
    })
}));

export const passwords = sqliteTable('passwords', {
    hash: text("hash").notNull(),
    userId: text("userId").notNull().references(() => users.id),
});

export const passwordsRelations = relations(passwords, ({ one }) => ({
    user: one(users, {
        fields: [passwords.userId],
        references: [users.id],
    }),
}));

