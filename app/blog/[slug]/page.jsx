import Link from "next/link";
import { formatDate, getPost, getSlugs } from "@/lib/blog";
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
    const site = "www.nihalu.com";

    const url = `https://www.nihalu.com/blog/${slug}`;

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
    const url = `https://www.nihalu.com/blog/${slug}`;

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
            "url": "https://www.nihalu.com",
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
        <main className="min-h-svh bg-background px-6 py-24 text-foreground">
            <BlogJsonLd slug={slug} frontMatter={frontMatter} />

            <div className="mx-auto max-w-4xl">
                <Link
                    href="/blog"
                    className="font-mono text-[13px] text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                    ← blog
                </Link>

                <article className="mt-10">
                    <header className="max-w-2xl">
                        <h1 className="font-serif text-5xl leading-[1.05] text-balance sm:text-6xl">
                            {frontMatter.title}
                        </h1>

                        {frontMatter.date && (
                            <time
                                dateTime={frontMatter.date}
                                className="mt-4 block font-mono text-xs text-subtle"
                            >
                                {formatDate(frontMatter.date)}
                            </time>
                        )}

                        {frontMatter.description && (
                            <p className="mt-6 font-serif text-xl leading-snug text-foreground/80 text-pretty sm:text-2xl">
                                {frontMatter.description}
                            </p>
                        )}
                    </header>

                    <div
                        className="prose prose-neutral dark:prose-invert mt-14 max-w-2xl
                        prose-headings:font-serif prose-headings:font-normal prose-headings:text-foreground
                        prose-p:text-foreground/80 prose-li:text-foreground/80
                        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                        prose-code:font-mono prose-code:text-accent
                        prose-pre:border prose-pre:border-border-main prose-pre:bg-card"
                    >
                        <MDXRemote source={content} components={components} />
                    </div>
                </article>
            </div>
        </main>
    );
}
