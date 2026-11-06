import Link from "next/link";

const pages = ["home", "skills", "projects", "experience", "about", "contact"];

const elsewhere = [
  { name: "instagram", url: "https://instagram.com/io.nihal" },
  { name: "linkedin", url: "https://linkedin.com/in/n1hal" },
  { name: "github", url: "https://github.com/ionihal" },
  { name: "x", url: "https://x.com/n1haaaal" },
  { name: "buy me a coffee", url: "https://www.buymeacoffee.com/n1hal", highlight: true },
];


const link =
  "text-muted underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:underline";

const coffee =
  "uppercase text-yellow-600 dark:text-yellow-400 underline-offset-4 transition-colors hover:underline focus-visible:underline";

export default function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border-main bg-background px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-8 font-mono text-sm">
        <div className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-8">
          <p className="mb-2 text-xs text-subtle sm:mb-0">pages</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {pages.map((p) => (
              <Link key={p} href={`/#${p}`} className={link}>
                {p}
              </Link>
            ))}
            <Link href="/blog" className={link}>
              blog
            </Link>
          </nav>
        </div>

        <div className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-8">
          <p className="mb-2 text-xs text-subtle sm:mb-0">elsewhere</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {elsewhere.map(({ name, highlight, url }) => (
              <li key={name}>
                <a href={url} target="_blank" rel="noopener noreferrer" className={highlight ? coffee : link}>
                  {name} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="pt-8 text-xs text-subtle">ioNihal © {year}</p>
      </div>
    </footer >
  );
}