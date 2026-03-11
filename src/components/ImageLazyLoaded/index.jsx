import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const cellStyle = {
    width: "200px",
    height: "200px",
}

const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover"
}

export default function ImageLazyLoaded({ image }) {
    const { ref, loaded } = useIntersectionObserver();

    return (
        <div ref={ref} style={cellStyle}>
            {<img src={loaded ? image : ''} alt={image} style={imgStyle} />}
        </div>
    );
}