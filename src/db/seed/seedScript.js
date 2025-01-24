import { seedDatabase } from "./seedScript";

async function runSeed() {
	await seedDatabase();
}

runSeed();
