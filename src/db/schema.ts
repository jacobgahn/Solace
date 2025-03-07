import { sql } from "drizzle-orm";
import {
	pgTable,
	integer,
	text,
	serial,
	timestamp,
	bigint,
} from "drizzle-orm/pg-core";

const advocates = pgTable("advocates", {
	id: serial("id").primaryKey(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	city: text("city").notNull(),
	degree: text("degree").notNull(),
	specialties: text("specialties").array().default([]),
	yearsOfExperience: integer("years_of_experience").notNull(),
	phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
	createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

type SelectAdvocate = typeof advocates.$inferSelect;

export { advocates, type SelectAdvocate };
