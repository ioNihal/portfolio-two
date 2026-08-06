// Source - https://stackoverflow.com/a/67671946
// Posted by theshubhagrwl
// Retrieved 2026-08-06, License - CC BY-SA 4.0
// Modified by Nihal K to fit the project structure and styling (css to tailwind classes)

export default function BuyMeACoffee() {
    return (
        <a
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-black/10 bg-[#FFDD00] text-black font-semibold shadow-[0_12px_30px_rgba(255,221,0,0.22)] transition duration-300 hover:bg-[#e6c00a] hover:shadow-[0_14px_40px_rgba(255,221,0,0.28)] focus:outline-none focus:ring-2 focus:ring-[#FFDD00]/60 focus:ring-offset-2 focus:ring-offset-background"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.buymeacoffee.com/n1hal"
        >
            <img
                className="align-middle w-6 h-6"
                src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                alt="Buy me a coffee"
            />
            <span className="ml-2 text-xs uppercase tracking-[0.08em]">Buy me a coffee</span>
        </a>
    );
}
