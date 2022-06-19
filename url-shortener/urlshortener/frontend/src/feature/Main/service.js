export async function generateShortenedUrl(longUrl) {
	const response = await fetch("http://127.0.0.1:8000/shorten/", {
	    method: "POST",
	    body: JSON.stringify({ original_url: longUrl }),
	    headers: { "Content-Type": "application/json" },
	});

	return await response.json();
}