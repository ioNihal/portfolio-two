"use client";

import dynamic from "next/dynamic";

const Pettable = dynamic(() => import("./PettableCat"), { ssr: false });

export function LazyPettableCat(props) {
    return <Pettable {...props} />;
}