import {useMemo, useState, useEffect} from "react";
import {useDebounce} from "./hooks/useDebounce.tsx";

// Demo: create a large list so you can actually notice the benefit
function makeItems(count: number) {
    const words = ["apple", "banana", "orange", "grape", "mango", "kiwi", "melon"];
    return Array.from({ length: count }, (_, i) => {
        const w = words[i % words.length];
        return `${w} item #${i}`;
    });
}

const ITEMS = makeItems(500);

export default function DeferredSearchDemo() {
    const [query, setQuery] = useState("");
    const debouncedSearch = useDebounce(query, 400);
    // This value is allowed to lag behind during heavy renders
    // const deferredQuery = useDeferredValue(query);

    const results = useMemo(() => {
        const q = debouncedSearch.trim().toLowerCase();
        if (!q) return ITEMS.slice(0, 200); // show a small default set

        // Filtering a big list can be heavy—this is where deferring helps
        return ITEMS.filter((x) => x.toLowerCase().includes(q)).slice(0, 200);
    }, [debouncedSearch]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/1').then(res=>{
            console.log(res);
        })
    }, [debouncedSearch]);

    return (
        <div style={{ fontFamily: "sans-serif", padding: 16 }}>
            <h2>useDeferredValue Search</h2>
            <p>query :{query} </p>
            <p>deferredQuery: {debouncedSearch}</p>

            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search…"
                style={{ padding: 8, width: 320 }}
            />


            <div style={{ marginTop: 8 }}>
                <div style={{ marginBottom: 8 }}>
                    Showing {results.length} results (out of {ITEMS.length})
                </div>

                <ul>
                    {results.map((x) => (
                        <li key={x}>{x}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}