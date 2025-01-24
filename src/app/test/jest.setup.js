import dotenv from "dotenv";
import { createDatabase, destroyDatabase } from "drizzle-kit";
dotenv.config();

const TEST_DB_NAME = "solace_test_db";

let db;

beforeAll(async () => {
	db = await createDatabase(TEST_DB_NAME);
});

afterAll(async () => {
	await destroyDatabase(db);
});
