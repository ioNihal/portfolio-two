"use client";

import dynamic from "next/dynamic";

const Pettable = dynamic(() => import("./PettableCat"), { ssr: false });

export function LazyPettableCat(props) {
    return <Pettable {...props} />;
}

const CoffeeSip = dynamic(() => import("./Clicky").then((m) => m.CoffeeSip));

export function LazyCoffeeSip(props) {
    return <CoffeeSip {...props} />;
}