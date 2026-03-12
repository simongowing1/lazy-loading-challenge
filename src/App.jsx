import ImageGallery from "./components/ImageGallery";
import usePagination from "./hooks/usePagination";

export default function App() {
    const { items, isLoading, error, loadMoreTrigger } = usePagination();

    if (error) return <p>{error}</p>;
    if (!items.length) return <p>Loading…</p>;

    return (
        <>
            <ImageGallery
                images={items}
                loadMoreTrigger={loadMoreTrigger}
            />
            {isLoading && <p>Loading more…</p>}
        </>
    );
}
