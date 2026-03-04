/*Use useTransition when an update is not urgent and it causes
 noticeable render work that can make the UI feel laggy.
Use it for
Filtering/searching while typing (big lists, tables)
Switching tabs/routes/views that render heavy UI
Updating expensive derived UI (charts, lots of components)
Cases where you want to show a subtle “Updating…” via isPending
Don’t bother when
The update is fast (you can’t feel any lag)
The update must feel instant/precise (text input value, drag, hover, animations)*/

import  { useMemo, useState, useTransition } from "react";

type Tab = "home" | "analytics";

function HeavyAnalytics() {
    // Intentionally heavy CPU work during render:
    const total = useMemo(() => {
        let s = 0;
        for (let i = 0; i < 80000000; i++) s += i % 10;
        return s;
    }, []);

    return <div>Heavy analytics computed: {total}</div>;
}

export default function TabsPendingDemo() {
    const [tab, setTab] = useState<Tab>("home");
    const [count, setCount] = useState(0);
    const [isPending, startTransition] = useTransition();

    function selectTab(nextTab: Tab) {
        // Non-urgent update (may be deferred / interruptible)
        startTransition(() => {
            setTab(nextTab);
        });
    }

    return (
        <div style={{ fontFamily: "sans-serif", padding: 16 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button onClick={() => selectTab("home")}>Home</button>
                <button onClick={() => selectTab("analytics")}>Analytics (heavy)</button>

                {/* Urgent update: should stay responsive */}
                <button onClick={() => setCount((c) => c + 1)}>+1 (urgent)</button>
                <span>count: {count}</span>

                {/* This is the key: visible pending state */}
                {isPending && <span style={{ marginLeft: 8 }}>Switching…</span>}
            </div>

            <hr />

            {tab === "home" ? (
                <div>Home content</div>
            ) : (
                <HeavyAnalytics />
            )}
        </div>
    );
}