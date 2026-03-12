import { Fragment } from "react";
import ImageLazyLoaded from "../ImageLazyLoaded";

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 200px)",
    gap: "0"
}

export default function ImageGallery({ images, loadMoreTrigger }) {
    const { triggerRef, triggerIndex } = loadMoreTrigger ?? {};
    return (
        <div style={gridStyle}>
            {images.map((image, index) => (
                <Fragment key={index}>
                    {triggerIndex >= 0 && index === triggerIndex && (
                        <div ref={triggerRef} style={{ gridColumn: "1 / -1", height: 0 }} />
                    )}
                    <ImageLazyLoaded image={image} />
                </Fragment>
            ))}
        </div>
    );
}
