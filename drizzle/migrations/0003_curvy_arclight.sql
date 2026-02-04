ALTER TABLE `click_logs` MODIFY COLUMN `linkId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `short_link` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `short_link` ADD `title` varchar(255);--> statement-breakpoint
ALTER TABLE `short_link` DROP COLUMN `expires_at`;