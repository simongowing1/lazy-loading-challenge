import { useEffect, useRef, useState } from "react";
import { fetchImages } from "../api/wikimedia";

const COLS = 3;

export default function usePagination() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const offsetRef = useRef(0);
    const isLoadingRef = useRef(false);
    const triggerRef = useRef(null);

    const loadMore = async () => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);
        try {
            const next = await fetchImages(offsetRef.current);
            offsetRef.current += next.length;
            setItems((prev) => [...prev, ...next]);
        } catch {
            setError("Failed to load images.");
        } finally {
            isLoadingRef.current = false;
            setIsLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        loadMore();
    }, []);

    // Re-observe sentinel whenever items grow so it tracks the new penultimate row
    useEffect(() => {
        const sentinel = triggerRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) loadMore();
            },
            { rootMargin: "0px 0px 200px 0px" }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [items.length]);

    // Index of the first item in the last row — sentinel is placed just before it
    const triggerIndex =
        items.length > COLS
            ? items.length - (items.length % COLS || COLS)
            : -1;

    return { items, isLoading, error, loadMoreTrigger: { triggerIndex, triggerRef } };
}
