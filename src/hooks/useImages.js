import { useState, useEffect } from "react";

const WORDS = ["nature", "mountain", "ocean", "forest", "city", "animal", "flower", "sky"];
const searchTerm = WORDS[Math.floor(Math.random() * WORDS.length)];

const WIKIMEDIA_URL =
    "https://commons.wikimedia.org/w/api.php?" +
    new URLSearchParams({
        action: "query",
        generator: "search",
        gsrsearch: `${searchTerm} filetype:bitmap`,
        gsrnamespace: "6",
        gsrlimit: "30",
        prop: "imageinfo",
        iiprop: "url",
        iiurlwidth: "200",
        format: "json",
        origin: "*",
    });

export default function useImages() {

    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(WIKIMEDIA_URL)
            .then((res) => res.json())
            .then((data) => {
                const urls = Object.values(data.query.pages)
                    .map((page) => page.imageinfo?.[0]?.thumburl)
                    .filter(Boolean);
                setImages(urls);
            })
            .catch(() => setError("Failed to load images."));
    }, []);

    return { images, error };
}