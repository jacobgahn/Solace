"use client";

import { get_advocates } from "@/app/api/advocates/route";
import { useState } from "react";

const DEFAULT_PAGE_SIZE = 10;

interface Props {
  initialAdvocates: Advocate[];
}

export default function AdvocateSearch({ initialAdvocates }: Props) {
  const [advocates, setAdvocates] = useState(initialAdvocates);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const searchAdvocates = async (searchTerm: string): Promise<Advocate[]> => {
    setSearchTerm(searchTerm);
    const advocates = await fetch(`/api/advocates?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}`).then((response) => {
      return response.json()
    });
    setAdvocates(advocates);
    return advocates;
  }

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    await searchAdvocates(searchTerm);
  };

  const onClick = () => {
    searchAdvocates("");
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Solace Advocates</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <p className="text-lg font-semibold text-gray-700 mb-2">Quick Search</p>
        <div className="flex gap-4">
          <input 
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors max-w-[350px]"
            onChange={onChange}
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
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Degree</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialties</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Years of Experience</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {advocates.map((advocate) => (
              <tr 
                key={advocate.firstName + advocate.lastName}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{advocate.firstName + " " + advocate.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{advocate.city}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{advocate.degree}</td>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{advocate.yearsOfExperience}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{advocate.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}


export const getServerSideProps = async () => {
  const advocates = await get_advocates({ page: 1, pageSize: DEFAULT_PAGE_SIZE })
  return { props: { initialAdvocates: advocates } };
};
