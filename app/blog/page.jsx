import Link from "next/link";
import { formatDate, getAllPostsMeta, getSlugs } from "@/lib/blog";

export const metadata = {
    title: "Nihal's Blog",
    description: "Thoughts, experiments, and notes on building for the web.",
};

export default function BlogIndexPage() {
    const posts = getAllPostsMeta();

    return (
        <main className="relative min-h-screen bg-black text-white">

            <div className="relative mx-auto max-w-5xl px-6 py-16">

                <header className="mb-12 border-b border-white/10 pb-6">
                    <div className="flex justify-between">
                        <h1 className="font-mono text-3xl font-semibold tracking-tight sm:text-4xl">
                            Blog<span className="text-indigo-500">_</span>
                        </h1>
                        <Link href="/" className="text-sm font-mono text-white/60 hover:text-white">
                            Back
                        </Link>
                    </div>
                    <p className="mt-3 max-w-xl text-sm text-white/60">
                        Notes on building interfaces, systems, and experiments along the way.
                    </p>
                </header>

                {/* Posts */}
                <ul className="grid gap-4 sm:grid-cols-2">
                    {posts.map((post, index) => (
                        <li key={post.slug}>
                            <Link
                                href={`/blog/${post.slug}`}
                                className="group block h-full border border-white/10 bg-white/5 p-5 transition hover:border-indigo-500/40 hover:bg-white/10"
                            >
                                <div className="mb-2 text-xs font-mono tracking-widest text-white/40">
                                    POST // {String(index + 1).padStart(2, "0")}
                                </div>

                                <h2 className="text-lg font-semibold group-hover:text-indigo-400">
                                    {post.title}
                                </h2>

                                {post.date && (
                                    <time
                                        dateTime={post.date}
                                        className="mt-1 block text-xs text-white/40"
                                    >
                                        {formatDate(post.date)}
                                    </time>
                                )}

                                {post.description && (
                                    <p className="mt-3 text-sm text-white/60">
                                        {post.description}
                                    </p>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
