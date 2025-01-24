import "dotenv/config";
import db from "../../db";
import { advocates } from "../schema";
import { advocateData } from "./advocates";

export const seedDatabase = async () => {
	try {
		await db.delete(advocates);
		await db.insert(advocates).values(advocateData).returning();
	} catch (error) {
		console.error("Error seeding database:", error);
	}
};

seedDatabase();
