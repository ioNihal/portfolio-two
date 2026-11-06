import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-svh flex-col justify-center bg-background px-6 py-24 text-foreground">
            <div className="mx-auto w-full max-w-4xl">
                <p className="font-mono text-[13px] text-muted">404</p>
                <h1 className="mt-6 font-serif text-6xl leading-[1.05] sm:text-7xl">
                    Page not found
                </h1>
                <Link
                    href="/"
                    className="mt-10 inline-block font-mono text-sm underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                    go home ↗
                </Link>
            </div>
        </main>
    );
}