import db from "@/db";
import { advocates, SelectAdvocate } from "../../db/schema";
import { arrayOverlaps, sql } from "drizzle-orm";
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
}): Promise<SelectAdvocate[]> => {
	const query = db.select().from(advocates);

	if (searchTerm) {
		query.where(
			sql`${advocates.firstName} ILIKE ${searchTerm} 
                OR ${advocates.lastName} ILIKE ${searchTerm} 
                OR ${advocates.city} ILIKE ${searchTerm} 
                OR ${advocates.degree} ILIKE ${searchTerm}`
		);
	}

	if (specialties.length > 0) {
		query.where(arrayOverlaps(advocates.specialties, specialties));
	}

	if (page && pageSize) {
		query.limit(pageSize).offset((page - 1) * pageSize);
	}

	return await query;
};
