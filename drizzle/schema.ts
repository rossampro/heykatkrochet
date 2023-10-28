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
    price: real("price").notNull(),
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
