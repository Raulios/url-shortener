export async function getStatsPerDay(shortenedUrlId) {
	const response = await fetch("http://127.0.0.1:8000/url-stats/" + shortenedUrlId + "/", {
	    method: "GET",
	    headers: { "Content-Type": "application/json" },
	});

	return await response.json();
}