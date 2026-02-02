import Link from "next/link";
import { getSlugs } from "@/lib/blog";

export const metadata = {
    title: "Nihal's Blog",
    description: "Thoughts, experiments, and notes on building for the web.",
};

export default function BlogIndexPage() {
    const slugs = getSlugs();

    return (
        <main className="relative min-h-screen bg-black text-white">

            <div className="relative mx-auto max-w-5xl px-6 py-16">
               
                <header className="mb-12 border-b border-white/10 pb-6">
                    <h1 className="font-mono text-3xl font-semibold tracking-tight sm:text-4xl">
                        Blog<span className="text-indigo-500">_</span>
                    </h1>
                    <p className="mt-3 max-w-xl text-sm text-white/60">
                        Notes on building interfaces, systems, and experiments along the way.
                    </p>
                </header>

                {/* Posts */}
                <ul className="grid gap-4 sm:grid-cols-2">
                    {slugs.map((slug, index) => (
                        <li key={slug}>
                            <Link
                                href={`/blog/${slug}`}
                                className="group block h-full border border-white/10 bg-white/5 p-5 transition hover:border-indigo-500/40 hover:bg-white/10"
                            >
                                <div className="mb-2 text-xs font-mono tracking-widest text-white/40">
                                    POST // {String(index + 1).padStart(2, "0")}
                                </div>

                                <h2 className="text-lg font-semibold leading-snug group-hover:text-indigo-400">
                                    {slug.replace(/-/g, " ")}
                                </h2>

                                <div className="mt-4 text-xs text-white/40">
                                    Read article
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
