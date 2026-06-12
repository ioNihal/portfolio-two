import Link from "next/link";
import { formatDate, getAllPostsMeta } from "@/lib/blog";

const SITE_URL = "https://ionihal.vercel.app";
const OG_HOST = "https://rendercard.vercel.app";

export const metadata = {
    title: "Blog · Nihal K",
    description: "Thoughts, experiments, and notes on building for the web.",

    alternates: {
        canonical: `${SITE_URL}/blog`,
    },

    openGraph: {
        title: "Blog · Nihal K",
        description: "Thoughts, experiments, and notes on building for the web.",
        url: `${SITE_URL}/blog`,
        siteName: "Nihal K",
        type: "website",
        images: [
            {
                url: `${OG_HOST}/api/rendercard?title=Blog&description=Thoughts%2C+experiments%2C+and+notes+on+building+for+the+web.&site=ionihal.vercel.app&theme=spotlight`,
                width: 1200,
                height: 630,
                alt: "Blog · Nihal K",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Blog · Nihal K",
        description: "Thoughts, experiments, and notes on building for the web.",
        images: [
            `${OG_HOST}/api/rendercard?title=Blog&description=Thoughts%2C+experiments%2C+and+notes+on+building+for+the+web.&site=ionihal.vercel.app&theme=spotlight`,
        ],
    },
};


export default function BlogIndexPage() {
    const posts = getAllPostsMeta();

    return (
        <main className="relative min-h-screen bg-background text-foreground">

            <div className="relative mx-auto max-w-5xl px-6 py-14">

                <header className="mb-12 border-b border-border-main pb-6">
                    <Link href="/" className="text-sm font-mono text-muted hover:text-foreground">
                        Back
                    </Link>
                    <h1 className="mt-6 font-mono text-3xl font-semibold tracking-tight sm:text-4xl">
                        Blog<span className="text-indigo-500">_</span>
                    </h1>
                    <p className="mt-3 max-w-xl text-sm text-muted">
                        Notes on building interfaces, systems, and experiments along the way.
                    </p>
                </header>

                {/* Posts */}
                <ul className="grid gap-4 sm:grid-cols-2">
                    {posts.map((post, index) => (
                        <li key={post.slug}>
                            <Link
                                href={`/blog/${post.slug}`}
                                className="group block h-full border border-border-main bg-card p-5 transition hover:border-indigo-500/40 hover:bg-card-hover"
                            >
                                <div className="mb-2 text-xs font-mono tracking-widest text-subtle">
                                    POST // {String(index + 1).padStart(2, "0")}
                                </div>

                                <h2 className="text-lg font-semibold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                    {post.title}
                                </h2>

                                {post.date && (
                                    <time
                                        dateTime={post.date}
                                        className="mt-1 block text-xs text-subtle"
                                    >
                                        {formatDate(post.date)}
                                    </time>
                                )}

                                {post.description && (
                                    <p className="mt-3 text-sm text-muted">
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
