import "dotenv/config";
import db from "..";
import { advocates } from "../schema";
import { advocateData } from "./advocatesSeedData";

export async function seedDatabase() {
	try {
		console.log("Seeding database...");
		await db.delete(advocates);
		const seededAdvocates = await db
			.insert(advocates)
			.values(advocateData)
			.returning();
		console.log("Seeded ", seededAdvocates.length, " advocates");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		process.exit();
	}
}

seedDatabase();
