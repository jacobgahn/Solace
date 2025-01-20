import { searchAdvocates } from "@/app/selectors/advocates";
import { getUniqueSpecialties } from "@/app/selectors/specialties";

interface Filters {
	searchTerm?: string;
	specialties?: string[];
	page?: number;
	pageSize?: number;
}

interface ResponseBody {
	advocates: Advocate[];
	specialties: string[];
}

export const getAdvocates = async ({
	searchTerm,
	specialties,
	page,
	pageSize,
}: Filters): Promise<ResponseBody> => {
	const advocates = await searchAdvocates({
		searchTerm,
		specialties,
		page,
		pageSize,
	});

	const uniqueSpecialties = await getUniqueSpecialties(advocates);

	const data = advocates.map((advocate) => ({
		firstName: advocate.firstName,
		lastName: advocate.lastName,
		city: advocate.city,
		degree: advocate.degree,
		specialties: advocate.specialties ?? [],
		yearsOfExperience: advocate.yearsOfExperience,
		phoneNumber: advocate.phoneNumber,
	}));

	return {
		advocates: data,
		specialties: uniqueSpecialties,
	};
};

export const POST = async (request: Request): Promise<Response> => {
	const {
		searchTerm,
		specialties: specialtiesFilter,
		page,
		pageSize,
	}: Filters = await request.json();

	const { advocates, specialties } = await getAdvocates({
		searchTerm,
		specialties: specialtiesFilter,
		page,
		pageSize,
	});

	return Response.json({
		advocates,
		specialties,
	});
};
