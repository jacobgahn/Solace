import dotenv from "dotenv";
import { searchAdvocates } from "./advocates";
import { prepareTestDatabase } from "../test/prepareTestDatabase";
import { advocates } from "@/db/schema";
import db from "@/db";

dotenv.config({ path: "@/test.env" });

beforeAll(async () => {
	await prepareTestDatabase();
});

afterAll(async () => {
	await db.delete(advocates);
});

describe("searchAdvocates", () => {
	it("should return advocates and specialties", async () => {
		const filters = {
			searchTerm: "John",
			specialties: ["Criminal Law"],
			page: 1,
			pageSize: 10,
		};

		const response = await searchAdvocates(filters);

		expect(response.advocates).toBeDefined();
		expect(response.totalResults).toBeGreaterThan(0);
	});

	it("should return advocates with a specific search term", async () => {
		const filters = {
			searchTerm: "Jane",
			page: 1,
			pageSize: 10,
		};

		const response = await searchAdvocates(filters);

		expect(response.advocates).toBeDefined();
		expect(response.advocates.length).toBeGreaterThan(0);
	});

	it("should return advocates with specific specialties", async () => {
		const filters = {
			specialties: ["Family Law"],
			page: 1,
			pageSize: 10,
		};

		// Since specialties are seeded at random, insert one with a specialty to test
		await db.insert(advocates).values({
			firstName: "John",
			lastName: "Doe",
			city: "New York",
			degree: "MD",
			yearsOfExperience: 5,
			phoneNumber: 1234567890,
			specialties: ["Family Law"],
		});

		const response = await searchAdvocates(filters);

		expect(response.advocates).toBeDefined();
		expect(response.advocates.length).toBeGreaterThan(0);
	});

	it("should paginate results correctly", async () => {
		const filters = {
			page: 2,
			pageSize: 5,
		};

		const response = await searchAdvocates(filters);

		expect(response.advocates).toBeDefined();
		expect(response.advocates.length).toBeLessThanOrEqual(5);
	});
});
