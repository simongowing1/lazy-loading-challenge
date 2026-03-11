import { useState, useRef, useEffect } from "react";

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
    const [loaded, setLoaded] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setLoaded(true);
                    observer.unobserve(element);
                }
            },
            {
                rootMargin: "0px 0px 100px 0px",
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={ref} style={cellStyle}>
            {loaded && <img src={image} alt={image} style={imgStyle} />}
        </div>
    );
}