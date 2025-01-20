import db from "@/db";
import { advocates, SelectAdvocate } from "@/db/schema";
import { asc, sql } from "drizzle-orm";

export const getUniqueSpecialties = async (
	filteredAdvocates?: SelectAdvocate[]
): Promise<string[]> => {
	const result: { specialties: string }[] = await db
		.selectDistinct({
			specialties: sql<string>`unnest(${advocates.specialties})`,
		})
		.from(advocates);

	return result.map((r) => r.specialties);
};
