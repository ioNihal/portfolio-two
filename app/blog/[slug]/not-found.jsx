import Link from "next/link";

const link =
    "text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:underline";

export default function NotFound() {
    return (
        <main className="flex min-h-svh flex-col justify-center bg-background px-6 py-24 text-foreground">
            <div className="mx-auto w-full max-w-4xl">
                <p className="font-mono text-[13px] text-muted">404</p>
                <h1 className="mt-6 font-serif text-6xl leading-[1.05] sm:text-7xl">
                    Article not found
                </h1>
                <p className="mt-4 max-w-md font-serif text-xl leading-snug text-foreground/80 sm:text-2xl">
                    It doesn&apos;t exist or has moved.
                </p>
                <nav className="mt-10 flex gap-8 font-mono text-sm">
                    <Link href="/blog" className={link}>all posts ↗</Link>
                    <Link href="/" className={link}>home</Link>
                </nav>
            </div>
        </main>
    );
}