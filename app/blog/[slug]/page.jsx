import Link from "next/link";
import { formatDate, getPost, getSlugs, truncateTitle } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import * as components from "@/components/MdxComponents";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;

    let post;
    try {
        post = getPost(slug);
    } catch {
        return {};
    }

    const { frontMatter } = post;

    const title = frontMatter.title;
    const description = frontMatter.description ?? "";
    const publishedTime = frontMatter.date
        ? new Date(frontMatter.date).toISOString()
        : undefined;

    const url = `https://ionihal.vercel.app/blog/${slug}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            type: "article",
            url,
            title,
            description,
            publishedTime,
            authors: ["Nihal K"],
        },
        twitter: {
            card: "summary",
            title,
            description,
        },
    };
}


function BlogJsonLd({ slug, frontMatter }) {
    const url = `https://ionihal.vercel.app/blog/${slug}`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": frontMatter.title,
        "description": frontMatter.description,
        "datePublished": frontMatter.date
            ? new Date(frontMatter.date).toISOString()
            : undefined,
        "author": {
            "@type": "Person",
            "name": "Nihal K",
            "url": "https://ionihal.vercel.app",
        },
        "publisher": {
            "@type": "Person",
            "name": "Nihal K",
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(jsonLd),
            }}
        />
    );
}


export default async function BlogViewPage({ params }) {
    const { slug } = await params;

    let post;
    try {
        post = getPost(slug);
    } catch {
        notFound();
    }

    const { content, frontMatter } = post;

    return (
        <main className="relative min-h-screen bg-black text-white">
            <BlogJsonLd slug={slug} frontMatter={frontMatter} />

            {/* Background grid */}
            <div className="pointer-events-none absolute inset-0 bg-grid" />

            <div className="relative mx-auto max-w-4xl px-6 py-16">
                <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-4">
                    <Link href="/blog" className="text-sm font-mono text-white/60 hover:text-white">
                        Back
                    </Link>

                    <span className="text-xs font-digital tracking-widest text-white/40">
                        ARTICLE // {truncateTitle(frontMatter.title.toUpperCase(), 18)}
                    </span>
                </div>

                {/* Article container */}
                <article
                    className="prose prose-invert prose-neutral max-w-none prose-headings:font-mono
                    prose-headings:text-white  prose-p:text-white/70  prose-a:text-indigo-400
                    prose-a:no-underline hover:prose-a:underline prose-code:font-mono  prose-code:text-indigo-300
                    prose-pre:bg-white/5  prose-pre:border prose-pre:border-white/10">

                    <h1>{frontMatter.title}</h1>

                    {frontMatter.date && (
                        <time
                            dateTime={frontMatter.date}
                            className="block mt-2 text-xs font-mono tracking-wide text-white/40"
                        >
                            {formatDate(frontMatter.date)}
                        </time>
                    )}

                    {frontMatter.description && (
                        <p className="mt-2 mb-6 max-w-2xl text-sm text-white/50">
                            {frontMatter.description}
                        </p>
                    )}

                    <MDXRemote source={content} components={components} />
                </article>
            </div>
        </main>
    );
}
