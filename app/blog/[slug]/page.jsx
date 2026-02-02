import Link from "next/link";
import { getPost, getSlugs } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import * as components from "@/components/MdxComponents";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return getSlugs().map((slug) => ({ slug }));
}

export default async function BlogViewPage({ params }) {
    const { slug } = await params;

    let source;
    try {
        source = getPost(slug);
    } catch {
        notFound();
    }

    return (
        <main className="relative min-h-screen bg-black text-white">
            {/* Background grid */}
            <div className="pointer-events-none absolute inset-0 bg-grid" />

            <div className="relative mx-auto max-w-4xl px-6 py-16">
                <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-4">
                    <Link href="/blog" className="text-sm font-mono text-white/60 hover:text-white">
                        Back
                    </Link>

                    <span className="text-xs font-digital tracking-widest text-white/40">
                        ARTICLE // {slug.toUpperCase().slice(0, 12)}
                    </span>
                </div>

                {/* Article container */}
                <article
                    className="prose prose-invert prose-neutral max-w-none prose-headings:font-mono
                    prose-headings:text-white  prose-p:text-white/70  prose-a:text-indigo-400
                    prose-a:no-underline hover:prose-a:underline prose-code:font-mono  prose-code:text-indigo-300
                    prose-pre:bg-white/5  prose-pre:border prose-pre:border-white/10">
                    <MDXRemote source={source} components={components} />
                </article>
            </div>
        </main>
    );
}
