import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function PageNotFound() {
    const navigate = useNavigate();
    const [secondsLeft, setSecondsLeft] = useState(5);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSecondsLeft((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (secondsLeft === 0) {
            navigate("/");
        }
    }, [secondsLeft, navigate]);

    return <div>Page Not Found. Redirecting to home in {secondsLeft}...</div>;
}
