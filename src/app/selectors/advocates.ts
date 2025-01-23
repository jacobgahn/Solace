import db from "@/db";
import { advocates, SelectAdvocate } from "../../db/schema";
import { and, arrayOverlaps, count, sql } from "drizzle-orm";
import { DEFAULT_PAGE_SIZE } from "@/constants";

export const searchAdvocates = async ({
	searchTerm,
	specialties = [],
	page = 1,
	pageSize = DEFAULT_PAGE_SIZE,
}: {
	searchTerm?: string;
	specialties?: string[];
	page?: number;
	pageSize?: number;
}): Promise<{ advocates: SelectAdvocate[]; totalResults: number }> => {
	const whereClause = and(
		searchTerm
			? sql`${advocates.firstName} ILIKE ${searchTerm} 
			OR ${advocates.lastName} ILIKE ${searchTerm} 
			OR ${advocates.city} ILIKE ${searchTerm} 
			OR ${advocates.degree} ILIKE ${searchTerm}`
			: sql`true`,
		specialties.length > 0
			? arrayOverlaps(advocates.specialties, specialties)
			: sql`true`
	);

	const query = db
		.select()
		.from(advocates)
		.where(whereClause)
		.limit(pageSize)
		.offset((page - 1) * pageSize);

	const totalResults = await db
		.select({ count: count() })
		.from(advocates)
		.where(whereClause);

	return { advocates: await query, totalResults: totalResults[0].count };
};
