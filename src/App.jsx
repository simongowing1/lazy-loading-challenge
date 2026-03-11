import ImageGallery from "./components/ImageGallery";
import useImages from "./hooks/useImages";

export default function App() {
    const { images, error } = useImages();

    if (error) return <p>{error}</p>;
    if (!images.length) return <p>Loading…</p>;

    return <ImageGallery images={images} />;
}
