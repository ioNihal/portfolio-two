import dynamic from "next/dynamic";

const ContactSection = dynamic(
    () => import("./ContactSection"),
    {
        ssr: false,
        loading: () => (
            <div className="min-h-screen flex items-center justify-center text-muted">
                Loading contact form…
            </div>
        ),
    }
);

export default function LazyContactSection() {
    return <ContactSection />;
}