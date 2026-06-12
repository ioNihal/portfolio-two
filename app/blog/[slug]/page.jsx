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
    const date = frontMatter.date ?? "";
    const site = "ionihal.vercel.app";

    const url = `https://ionihal.vercel.app/blog/${slug}`;

    const ogParams = new URLSearchParams({
        title,
        description,
        date,
        site,
        theme: "dark",
    });

    const ogImage = `https://rendercard.vercel.app/api/rendercard?${ogParams.toString()}`;

    const publishedTime = frontMatter.date
        ? new Date(frontMatter.date).toISOString()
        : undefined;


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
            siteName: "Nihal K",
            authors: ["Nihal K"],
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
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
        <main className="relative min-h-screen bg-background text-foreground">
            <BlogJsonLd slug={slug} frontMatter={frontMatter} />

            {/* Background grid */}
            {/* <div className="pointer-events-none absolute inset-0 bg-grid" /> */}

            <div className="relative mx-auto max-w-4xl px-6 py-16">
                <div className="mb-10 flex items-center justify-between border-b border-border-main pb-4">
                    <Link href="/blog" className="text-sm font-mono text-muted hover:text-foreground">
                        Back
                    </Link>

                    <span className="text-xs font-digital tracking-widest text-subtle">
                        ARTICLE // {truncateTitle(frontMatter.title.toUpperCase(), 18)}
                    </span>
                </div>

                {/* Article container */}
                <article
                    className="prose prose-neutral dark:prose-invert max-w-none text-foreground prose-headings:font-mono
                    prose-headings:text-foreground prose-p:text-muted prose-a:text-indigo-600 dark:prose-a:text-indigo-400
                    prose-a:no-underline hover:prose-a:underline prose-code:font-mono prose-code:text-indigo-600 dark:prose-code:text-indigo-300
                    prose-pre:bg-card prose-pre:border prose-pre:border-border-main">

                    <h1 className="text-xl lg:text-2xl text-foreground">{frontMatter.title}</h1>

                    {frontMatter.date && (
                        <time
                            dateTime={frontMatter.date}
                            className="block mt-2 text-xs font-mono tracking-wide text-subtle"
                        >
                            {formatDate(frontMatter.date)}
                        </time>
                    )}

                    {frontMatter.description && (
                        <p className="mt-2 mb-6 max-w-2xl text-sm text-muted">
                            {frontMatter.description}
                        </p>
                    )}

                    <MDXRemote source={content} components={components} />
                </article>
            </div>
        </main>
    );
}
