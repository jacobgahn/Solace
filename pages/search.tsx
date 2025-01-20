"use client";

import { useEffect, useState } from "react";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import { getAdvocates } from "@/app/api/advocates/route";

interface Props {
	initialAdvocates: Advocate[];
	initialSpecialties: SpecialtyFilterInput[];
}

interface SpecialtyFilterInput {
	specialty: string;
	isChecked: boolean;
}

export default function AdvocateSearch({
	initialAdvocates,
	initialSpecialties,
}: Props) {
	const [advocates, setAdvocates] = useState(initialAdvocates);
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
	const [specialtyFilterInputs, setSpecialtyFilterInputs] =
		useState(initialSpecialties);

	const searchAdvocates = async (): Promise<void> => {
		const specialtiesToFilterBy = specialtyFilterInputs
			? specialtyFilterInputs.filter((s) => s.isChecked).map((s) => s.specialty)
			: undefined;

		const payload = {
			searchTerm,
			page,
			pageSize,
			specialties: specialtiesToFilterBy,
		};

		const response = await fetch(`/api/advocates`, {
			method: "POST",
			body: JSON.stringify(payload),
		}).then((response) => {
			return response.json();
		});

		setAdvocates(response.advocates);
	};

	useEffect(() => {
		searchAdvocates();
	}, [specialtyFilterInputs, searchTerm]);

	const clearSpecialties = async () => {
		setSpecialtyFilterInputs(
			specialtyFilterInputs.map((s) => ({ ...s, isChecked: false }))
		);
		await searchAdvocates();
	};

	const onChangeSearchTerm = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value;
		setSearchTerm(searchTerm || "");
		await searchAdvocates();
	};

	const onChangeSpecialties = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const specialtyChanged = e.target.value;
		const isChecked = e.target.checked;

		// Set the new state of the specialty filter inputs
		const newSelectedSpecialties = specialtyFilterInputs.map((s) =>
			s.specialty === specialtyChanged ? { ...s, isChecked: isChecked } : s
		);

		setSpecialtyFilterInputs(newSelectedSpecialties);
	};

	const onClick = async (e: React.MouseEvent) => {
		setSearchTerm("");
	};

	return (
		<main className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold text-gray-800 mb-8">
				Solace Advocates
			</h1>

			<div className="bg-white p-6 rounded-lg shadow-md mb-8">
				<p className="text-lg font-semibold text-gray-700 mb-2">Quick Search</p>
				<div className="flex flex-col gap-4">
					<div className="flex gap-4">
						<input
							className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors max-w-[350px]"
							onChange={onChangeSearchTerm}
							value={searchTerm}
							placeholder="Search advocates by name, degree, or city..."
						/>
						<button
							onClick={onClick}
							className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
						>
							Reset Search
						</button>
					</div>

					<div className="mt-4">
						<p className="text-sm font-semibold text-gray-700 mb-2">
							Filter by Specialties
						</p>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
							{specialtyFilterInputs.map((s) => (
								<div key={s.specialty} className="flex items-center gap-2">
									<input
										type="checkbox"
										id={s.specialty}
										name={s.specialty}
										value={s.specialty}
										onChange={onChangeSpecialties}
										checked={s.isChecked}
										className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
									/>
									<label
										htmlFor={s.specialty}
										className="text-sm text-gray-700"
									>
										{s.specialty}
									</label>
								</div>
							))}
						</div>
						{specialtyFilterInputs.length > 0 && (
							<button
								onClick={() => clearSpecialties()}
								className="mt-4 px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
							>
								Clear Specialties
							</button>
						)}
					</div>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								First Name
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								City
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Degree
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Specialties
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Years of Experience
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Phone Number
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{advocates.map((advocate) => (
							<tr
								key={advocate.firstName + advocate.lastName}
								className="hover:bg-gray-50 transition-colors"
							>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
									{advocate.firstName + " " + advocate.lastName}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
									{advocate.city}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
									{advocate.degree}
								</td>
								<td className="px-6 py-4 text-sm text-gray-700">
									{advocate.specialties.map((s) => (
										<div
											key={s}
											className="inline-block px-2 py-1 mr-1 mb-1 bg-blue-100 text-blue-800 rounded-full text-xs"
										>
											{s}
										</div>
									))}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
									{advocate.yearsOfExperience}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
									{advocate.phoneNumber}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
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
