import { boolean, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const todo = pgTable('users', {
	id: uuid('id').defaultRandom().primaryKey(),
	content: varchar('content', { length: 255 }).notNull(),
	completed: boolean('completed').notNull().default(false),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});
