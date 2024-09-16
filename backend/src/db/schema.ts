import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const Users = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  email: text('email').notNull().unique(),

});


