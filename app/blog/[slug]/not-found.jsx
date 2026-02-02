import Link from "next/link";

export default function NotFound() {
    return (
        <main className="relative min-h-screen bg-black text-white flex items-center justify-center">
            <div className="relative mx-auto flex max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
                <span className="mb-4 font-digital text-xs tracking-widest text-white/40">
                    SYSTEM ERROR (fun dont panic)
                </span>

                <h1 className="text-6xl font-future font-semibold tracking-tight sm:text-7xl">
                    404<span className="text-indigo-500">_</span>
                </h1>

                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
                    The requested article does not exist or has been relocated.
                </p>

                <div className="mt-8 flex gap-4">
                    <Link
                        href="/"
                        className="border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
                    >
                        Go Home
                    </Link>

                    <Link
                        href="/blog"
                        className="border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-400 transition hover:bg-indigo-500/20"
                    >
                        View Blog
                    </Link>
                </div>
            </div>
        </main>
    );
}
