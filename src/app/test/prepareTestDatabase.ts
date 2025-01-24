import dotenv from "dotenv";
import db from "../../db";
import { advocates } from "../../db/schema";
import { advocateData } from "../../db/seed/advocatesSeedData";

dotenv.config({ path: "@/test.env" });

export async function prepareTestDatabase() {
	try {
		await db.delete(advocates);
		await db.insert(advocates).values(advocateData);
	} catch (error) {
		console.error("Error preparing test database:", error);
	}
}
