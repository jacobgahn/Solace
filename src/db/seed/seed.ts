import "dotenv/config";
import db from "../../db";
import { advocates } from "../schema";
import { advocateData } from "./advocates";

async function seedDatabase() {
	try {
		await db.delete(advocates);
		const records = await db.insert(advocates).values(advocateData).returning();
		console.log("Seeded advocates:", records);
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		process.exit();
	}
}

seedDatabase();
