import db from "../../../db";
import { advocates } from "../../../db/schema";
import { sql } from "drizzle-orm";
export const get_advocates = async (params?: {
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}): Promise<Advocate[]> => {
  const { searchTerm = null, page = 1, pageSize = 10 } = params || {};
  
  const data: Advocate[] = await db.select().from(advocates).where(
    searchTerm 
        ? sql`${advocates.firstName} ILIKE ${searchTerm} 
            OR ${advocates.lastName} ILIKE ${searchTerm} 
            OR ${advocates.city} ILIKE ${searchTerm} 
            OR ${advocates.degree} ILIKE ${searchTerm}`
          : undefined
  ).limit(pageSize).offset((page - 1) * pageSize);


  return data.map((advocate) => ({
    firstName: advocate.firstName,
    lastName: advocate.lastName,
    city: advocate.city,
    degree: advocate.degree,
    specialties: advocate.specialties as string[],
    yearsOfExperience: advocate.yearsOfExperience,
    phoneNumber: advocate.phoneNumber,
  }));
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("searchTerm") || undefined;
  const page = Number(searchParams.get("page")) || undefined;
  const pageSize = Number(searchParams.get("pageSize")) || undefined;

  const data = await get_advocates({ searchTerm, page, pageSize });

  return Response.json(data);
}
