CREATE TABLE `players` (
	`id` text PRIMARY KEY NOT NULL,
	`room` text NOT NULL,
	`token_hash` text NOT NULL,
	`name` text NOT NULL,
	`state` text NOT NULL,
	`matched` integer DEFAULT 0 NOT NULL,
	`attempts` integer DEFAULT 0 NOT NULL,
	`finished_at` integer,
	`revision` integer DEFAULT 0 NOT NULL,
	`joined_at` integer NOT NULL,
	`last_action_at` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`room`) REFERENCES `rooms`(`code`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `rooms` (
	`code` text PRIMARY KEY NOT NULL,
	`host_hash` text NOT NULL,
	`owner` text NOT NULL,
	`title` text NOT NULL,
	`config` text NOT NULL,
	`capacity` integer NOT NULL,
	`duration` integer NOT NULL,
	`status` text DEFAULT 'waiting' NOT NULL,
	`start_at` integer,
	`ended_at` integer,
	`created_at` integer NOT NULL,
	`expires_at` integer NOT NULL,
	`revision` integer DEFAULT 0 NOT NULL
);
