/*With a Promise: while it’s pending, the component suspends; if rejected,
 the nearest Error Boundary handles it.*/
import { Suspense, use, useMemo, useState } from "react";

function Message({ promise }:{promise:Promise<any>}) {
    const text = use(promise); // suspends while pending
    return <p>{text}</p>;
}

export default function App() {
    const [id, setId] = useState(1);

    // cache the Promise so it doesn't change on unrelated re-renders
    const promise = useMemo(() => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(r => r.text()), [id]);

    return (
        <>
            <button onClick={() => setId((x) => x + 1)}>Next</button>
            <Suspense fallback={<p>Loading…</p>}>
                <Message promise={promise} />
            </Suspense>
        </>
    );
}