const WORDS = ["nature", "mountain", "ocean", "forest", "city", "animal", "flower", "sky"];
const searchTerm = WORDS[Math.floor(Math.random() * WORDS.length)];

function buildUrl(offset = 0) {
    return (
        "https://commons.wikimedia.org/w/api.php?" +
        new URLSearchParams({
            action: "query",
            generator: "search",
            gsrsearch: `${searchTerm} filetype:bitmap`,
            gsrnamespace: "6",
            gsrlimit: "30",
            gsroffset: String(offset),
            prop: "imageinfo",
            iiprop: "url",
            iiurlwidth: "200",
            format: "json",
            origin: "*",
        })
    );
}

export async function fetchImages(offset = 0) {
    const res = await fetch(buildUrl(offset));
    const data = await res.json();
    return Object.values(data.query.pages)
        .map((page) => page.imageinfo?.[0]?.thumburl)
        .filter(Boolean);
}