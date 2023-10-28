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
    image: text("image").notNull(),
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

export const images = sqliteTable('images', {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    productId: text("product_id").references(() => products.id),
},
    (images) => ({
        idIdx: uniqueIndex("image_id_idx").on(images.id),
        productIdIdx: index("product_id_idx").on(images.productId),
    })
);

export const users = sqliteTable('users', {
    id: text("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    address: text("address"),
    createdAt: integer("created_at").default(sql`(cast (unixepoch () as int))`),
    updatedAt: integer("updated_at").default(sql`(cast (unixepoch () as int))`),
},
    (users) => ({
        emailIdx: uniqueIndex("email_idx").on(users.email),
        firstNameLastNameAddressIdx: index('first_name_last_name_address_idx').on(
            users.firstName,
            users.lastName,
            users.address
        ),
    })
);

export const userRelations = relations(users, ({ one, many }) => ({
    password: one(passwords, {
        fields: [users.id],
        references: [passwords.userId],
    }),
    cartItems: many(cartItems),
    orders: many(orders),
}));

export const passwords = sqliteTable("passwords", {
    hash: text("hash").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id),
});

export const passwordRelations = relations(passwords, ({ one }) => ({
    user: one(users, {
        fields: [passwords.userId],
        references: [users.id],
    }),
}));

export const cartItems = sqliteTable('cart_items', {
    id: text("id").primaryKey(),
    count: integer("count").notNull().default(1),
    userId: text("user_id")
        .notNull()
        .references(() => users.id),
    productId: text("product_id")
        .notNull()
        .references(() => products.id),
    createdAt: integer("created_at").default(sql`(cast (unixepoch () as int))`),
    updatedAt: integer("updated_at").default(sql`(cast (unixepoch () as int))`)
},
    (cartItems) => ({
        userIdProductIdx: uniqueIndex("cart_items_user_id_product_id_idx").on(
            cartItems.id
        ),
        productIdx: index('cart_items_product_id_idx').on(cartItems.productId),
    })
);

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
    user: one(users, {
        fields: [cartItems.userId],
        references: [users.id],
    }),
    product: one(products, {
        fields: [cartItems.productId],
        references: [products.id],
    }),
}));

export const orders = sqliteTable("orders", {
    id: text("id").primaryKey(),
    customerName: text("customer_name").notNull(),
    amount: real("amount").notNull(),
    shippingFees: real("shipping_fees").notNull(),
    finalAmount: real("final_amount").notNull(),
    shippingAddress: text("shipping_address").notNull(),
    paid: integer("paid").notNull().default(0),
    userId: text("user_id")
        .notNull()
        .references(() => users.id),
    createdAt: integer("created_at").default(sql`(cast (unixepoch () as int))`),
    updatedAt: integer("updated_at").default(sql`(cast (unixepoch () as int))`),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
    user: one(users, {
        fields: [orders.userId],
        references: [users.id],
    }),
    items: many(orderItems),
}));

export const orderItems = sqliteTable("order_items", {
    id: text("id").primaryKey(),
    count: integer("count").notNull().default(1),
    orderId: text("order_id")
        .notNull()
        .references(() => orders.id),
    productId: text("product_id")
        .notNull()
        .references(() => products.id),
    createdAt: integer("created_at").default(sql`(cast (unixepoch () as int))`),
    updatedAt: integer("updated_at").default(sql`(cast (unixepoch () as int))`),
},
    (orderItems) => ({
        orderIdProductIdIdx: uniqueIndex("order_items_order_id_product_id_idx").on(
            orderItems.orderId,
            orderItems.productId
        ),
        productIdx: index("order_items_product_id_idx").on(orderItems.productId),
    })
);

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id],
    }),
    product: one(products, {
        fields: [orderItems.productId],
        references: [products.id],
    }),
}));
