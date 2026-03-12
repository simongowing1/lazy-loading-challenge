import { useState, useEffect } from "react";
import { fetchImages } from "../api/wikimedia";

export default function useImages() {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchImages(0)
            .then(setImages)
            .catch(() => setError("Failed to load images."));
    }, []);

    return { images, error };
}
