import Link from "next/link";
import { formatDate, getAllPostsMeta } from "@/lib/blog";

const SITE_URL = "https://www.nihalu.com";
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
                url: `${OG_HOST}/api/rendercard?title=Blog&description=Thoughts%2C+experiments%2C+and+notes+on+building+for+the+web.&site=www.nihalu.com&theme=spotlight`,
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
            `${OG_HOST}/api/rendercard?title=Blog&description=Thoughts%2C+experiments%2C+and+notes+on+building+for+the+web.&site=www.nihalu.com&theme=spotlight`,
        ],
    },
};


export default function BlogIndexPage() {
    const posts = getAllPostsMeta();

    return (
        <main className="min-h-svh bg-background px-6 py-24 text-foreground">
            <div className="mx-auto max-w-4xl">
                <Link
                    href="/"
                    className="font-mono text-[13px] text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                    ← home
                </Link>

                <h1 className="mt-10 font-serif text-6xl leading-[1.05] sm:text-7xl">
                    Blog
                </h1>
                <p className="mt-4 max-w-xl font-serif text-xl leading-snug text-foreground/80 text-pretty sm:text-2xl">
                    Notes on building interfaces, systems, and experiments along the way.
                </p>

                <ul className="mt-20 space-y-12">
                    {posts.map((post) => (
                        <li key={post.slug} className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-8">
                            {post.date && (
                                <div>
                                    <time
                                        dateTime={post.date}
                                        className="mb-1 block font-mono text-xs text-subtle sm:mb-0 sm:pt-2"
                                    >
                                        {formatDate(post.date)}
                                    </time>
                                    <span className="font-mono text-xs text-accent">
                                        {post.source ?? "AI Content"}
                                    </span>
                                </div>
                            )}
                            <div className="sm:col-start-2">
                                <h2 className="font-serif text-3xl leading-tight text-balance">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:underline"
                                    >
                                        {post.title}
                                    </Link>
                                </h2>
                                {post.description && (
                                    <p className="mt-2 max-w-prose text-base leading-relaxed text-muted text-pretty">
                                        {post.description}
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
