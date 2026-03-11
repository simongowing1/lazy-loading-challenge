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
    const { loaded } = useIntersectionObserver();

    return (
        <div ref={ref} style={cellStyle}>
            {loaded && <img src={image} alt={image} style={imgStyle} />}
        </div>
    );
}