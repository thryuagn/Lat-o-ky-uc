import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const rooms = sqliteTable('rooms', {
 code: text('code').primaryKey(), hostHash: text('host_hash').notNull(), owner: text('owner').notNull(), title: text('title').notNull(), config: text('config').notNull(), capacity: integer('capacity').notNull(), duration: integer('duration').notNull(), status: text('status').notNull().default('waiting'), startAt: integer('start_at'), endedAt: integer('ended_at'), createdAt: integer('created_at').notNull(), expiresAt: integer('expires_at').notNull(), revision: integer('revision').notNull().default(0)
});
export const players = sqliteTable('players', {
 id: text('id').primaryKey(), room: text('room').notNull().references(()=>rooms.code), tokenHash: text('token_hash').notNull(), name: text('name').notNull(), state: text('state').notNull(), matched: integer('matched').notNull().default(0), attempts: integer('attempts').notNull().default(0), finishedAt: integer('finished_at'), revision: integer('revision').notNull().default(0), joinedAt: integer('joined_at').notNull(), lastActionAt: integer('last_action_at').notNull().default(0)
});
