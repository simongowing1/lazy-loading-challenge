import ImageLazyLoaded from "../ImageLazyLoaded";

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 200px)",
    gap: "0"
}

export default function ImageGallery({ images }) {
    return (
        <div style={gridStyle}>
            {images.map((image, index) => (
                <ImageLazyLoaded image={image} key={index} />
            ))}
        </div>
    );
}