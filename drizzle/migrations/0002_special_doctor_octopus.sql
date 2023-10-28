CREATE TABLE `images` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`product_id` text,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `id_idx` ON `images` (`id`);--> statement-breakpoint
CREATE INDEX `product_id_idx` ON `images` (`product_id`);