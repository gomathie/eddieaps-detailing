CREATE TABLE `blog_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`excerpt` text NOT NULL,
	`category` text NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	`author` text DEFAULT 'Eddie APS Detailing' NOT NULL,
	`image_url` text NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `bookings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`customer_name` text NOT NULL,
	`customer_email` text NOT NULL,
	`customer_phone` text NOT NULL,
	`vehicle_make` text NOT NULL,
	`vehicle_model` text NOT NULL,
	`vehicle_year` integer NOT NULL,
	`vehicle_type` text NOT NULL,
	`service_name` text NOT NULL,
	`preferred_date` text NOT NULL,
	`preferred_time` text NOT NULL,
	`address` text,
	`notes` text,
	`image_urls` text DEFAULT '[]' NOT NULL,
	`status` text DEFAULT 'Pending' NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `gallery` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`before_image` text NOT NULL,
	`after_image` text NOT NULL,
	`category` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'unread' NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `quotes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`customer_name` text NOT NULL,
	`customer_email` text NOT NULL,
	`customer_phone` text NOT NULL,
	`vehicle_make` text NOT NULL,
	`vehicle_model` text NOT NULL,
	`vehicle_year` integer NOT NULL,
	`service_required` text NOT NULL,
	`vehicle_condition` text NOT NULL,
	`image_urls` text DEFAULT '[]' NOT NULL,
	`preferred_date` text,
	`status` text DEFAULT 'Pending' NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`benefits` text DEFAULT '[]' NOT NULL,
	`process` text DEFAULT '[]' NOT NULL,
	`base_price` real NOT NULL,
	`duration` text NOT NULL,
	`image_url` text NOT NULL,
	`faqs` text DEFAULT '[]' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`author` text NOT NULL,
	`rating` integer NOT NULL,
	`content` text NOT NULL,
	`date` text NOT NULL,
	`approved` integer DEFAULT false NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`role` text DEFAULT 'admin' NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_posts_slug_unique` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `services_slug_unique` ON `services` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);