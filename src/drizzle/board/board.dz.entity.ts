import { datetime, mysqlTable, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const BoardDz = mysqlTable('board', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 2 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});