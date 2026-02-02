import Link from "next/link";

export default function NotFound() {
    return (
        <main className="h-screen flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-semibold mb-4">404</h1>
            <p className="mb-6">Page not found</p>
            <Link href="/" className="underline">
                Go home
            </Link>
        </main>
    );
}
