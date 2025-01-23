import { getAdvocates } from "@/app/api/advocates/route";
import AdvocateSearch from "@/app/components/AdvocateSearch/AdvocateSearch";
import { SpecialtyFilterInput } from "@/app/components/AdvocateSearch/types";

export default function SearchPage({
	initialAdvocates,
	initialSpecialties,
}: {
	initialAdvocates: Advocate[];
	initialSpecialties: SpecialtyFilterInput[];
}) {
	return (
		<div>
			<AdvocateSearch
				initialAdvocates={initialAdvocates}
				initialSpecialties={initialSpecialties}
			/>
		</div>
	);
}

export const getServerSideProps = async () => {
	const { advocates, specialties } = await getAdvocates({});

	const initialSpecialties = specialties.map((s) => ({
		specialty: s,
		isChecked: false,
	}));

	return { props: { initialAdvocates: advocates, initialSpecialties } };
};
