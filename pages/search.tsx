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
    <main style={{ margin: "24px" }}>
    <h1>Solace Advocates</h1>
    <br />
    <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term">{searchTerm}</span>
        </p>
        <input 
          style={{ border: "1px solid black" }} 
          onChange={onChange}
          value={searchTerm} 
        />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate) => (
            <tr key={advocate.firstName + advocate.lastName}>
              <td>{advocate.firstName}</td>
              <td>{advocate.lastName}</td>
              <td>{advocate.city}</td>
              <td>{advocate.degree}</td>
              <td>
                {advocate.specialties.map((s) => (
                  <div key={s}>{s}</div>
                ))}
              </td>
              <td>{advocate.yearsOfExperience}</td>
              <td>{advocate.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}


export const getServerSideProps = async () => {
  const advocates = await get_advocates()
  return { props: { initialAdvocates: advocates } };
};
