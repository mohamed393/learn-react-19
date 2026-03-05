/* B) Not stale, but restarts interval on every count change
import { useEffect, useState } from "react";
export default function App() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            console.log("count =", count); // ❌ stale after first render
        }, 1000);

        return () => clearInterval(id);
    }, []); // interval never restarts, but count is stale

    return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}
*/
/*
* useEffectEvent lets you write event/handler logic that always sees
* the latest props/state without forcing your useEffect to re-run.*/
import { useEffect, useState, useEffectEvent } from "react";

export default function App() {
    const [count, setCount] = useState(0);

    const logCount = useEffectEvent(() => {
        console.log("count =", count); // ✅ always latest
    });

    useEffect(() => {
        const id = setInterval(() => {
            logCount(); // ✅ interval stays the same
        }, 1000);

        return () => clearInterval(id);
    }, []); // ✅ no count here

    return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}