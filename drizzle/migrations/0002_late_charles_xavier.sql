CREATE TABLE `click_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`linkId` varchar(255) NOT NULL,
	`ip_address` varchar(255),
	`country` varchar(100) DEFAULT 'Unknown',
	`device` varchar(50),
	`referrer` varchar(255) DEFAULT 'Direct',
	`clicked_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `click_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `short_link` (
	`id` varchar(255) NOT NULL,
	`userId` int NOT NULL,
	`url` text NOT NULL,
	`short_code` varchar(10) NOT NULL,
	`clicks` int NOT NULL DEFAULT 0,
	`is_active` boolean NOT NULL DEFAULT true,
	`password` varchar(255),
	`expires_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `short_link_id` PRIMARY KEY(`id`),
	CONSTRAINT `short_link_short_code_unique` UNIQUE(`short_code`)
);
--> statement-breakpoint
ALTER TABLE `click_logs` ADD CONSTRAINT `click_logs_linkId_short_link_id_fk` FOREIGN KEY (`linkId`) REFERENCES `short_link`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `short_link` ADD CONSTRAINT `short_link_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;