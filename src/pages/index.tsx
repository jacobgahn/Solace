import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to /search
		router.push("/search");
	}, []);

	return null; // or a loading spinner if you prefer
}
