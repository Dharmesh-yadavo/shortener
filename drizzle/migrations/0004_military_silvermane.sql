CREATE TABLE `oauth_accounts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`provider` enum('google') NOT NULL,
	`provider_account_id` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `oauth_accounts_id` PRIMARY KEY(`id`),
	CONSTRAINT `oauth_accounts_provider_account_id_unique` UNIQUE(`provider_account_id`)
);
--> statement-breakpoint
CREATE TABLE `qr_codes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`linkId` int NOT NULL,
	`userId` int NOT NULL,
	`fgColor` varchar(7) DEFAULT '#000000',
	`bgColor` varchar(7) DEFAULT '#ffffff',
	`logoUrl` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `qr_codes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `password` varchar(255);--> statement-breakpoint
ALTER TABLE `click_logs` ADD `city` varchar(100) DEFAULT 'Unknown';--> statement-breakpoint
ALTER TABLE `click_logs` ADD `region` varchar(100) DEFAULT 'Unknown';--> statement-breakpoint
ALTER TABLE `click_logs` ADD `latitude` varchar(20);--> statement-breakpoint
ALTER TABLE `click_logs` ADD `longitude` varchar(20);--> statement-breakpoint
ALTER TABLE `short_link` ADD `type` varchar(20) DEFAULT 'link' NOT NULL;--> statement-breakpoint
ALTER TABLE `short_link` ADD `hasQr` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `short_link` ADD `is_hidden` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `short_link` ADD `deleted_at` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `image` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `stripe_customer_id` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `stripe_subscription_id` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `plan` enum('free','pro','business') DEFAULT 'free';--> statement-breakpoint
ALTER TABLE `users` ADD `plan_expires_at` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `links_created` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `qrs_created` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `oauth_accounts` ADD CONSTRAINT `oauth_accounts_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `qr_codes` ADD CONSTRAINT `qr_codes_linkId_short_link_id_fk` FOREIGN KEY (`linkId`) REFERENCES `short_link`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `qr_codes` ADD CONSTRAINT `qr_codes_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;