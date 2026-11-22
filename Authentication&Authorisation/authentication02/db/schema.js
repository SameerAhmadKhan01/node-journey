import { uuid, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { PassThrough } from "node:stream";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password : text().notNull()
});
