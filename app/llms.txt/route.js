import { getAllPostsMeta } from "@/lib/blog";

const SITE_URL = "https://www.nihalu.com";

export function GET() {
  const posts = getAllPostsMeta();

  const blogLinks = posts
    .map((post) => {
      const title = post.title || post.slug;
      const description = post.description || "A technical note from Nihal K.";

      return `- [${title}](${SITE_URL}/blog/${post.slug}): ${description}`;
    })
    .join("\n");

  const content = `# Nihal K

> Nihal K is a Full-Stack Developer and Software Engineer building fast, accessible, and database-optimized web systems, developer APIs, and open-source packages.

This is the personal portfolio of Nihal K. The site covers his professional experience, selected projects, technical skills, and writing about software development.

## Portfolio

- [Nihal K portfolio](${SITE_URL}/): Overview of Nihal's work, skills, experience, and contact information.
- [Blog](${SITE_URL}/blog): Technical notes, project diaries, and articles about building interfaces, systems, and experiments.

## Selected Projects

- [Explore Kasaragod](https://explorekasaragod.org): Community-driven directory for local food, travel spots, and essential services in Kasaragod.
- [RenderCard](https://rendercard.vercel.app): Developer API for generating customizable social preview cards with SVG and Vercel Edge Runtime.
- [Formcord](https://formcord.vercel.app): Lightweight NPM package for sending website form submissions and system events to Discord.

## Professional Stack

- Bun is the JavaScript and TypeScript runtime used in Nihal's workplace development workflow.
- Hono is used for lightweight, fast backend APIs and web services.
- Drizzle ORM is used for type-safe database access and schema-driven application development.
- PostgreSQL is used as the primary relational database.
- Next.js is used to build React-based frontend applications and full-stack web experiences.

## Technical Focus

- Full-stack web development with React, Next.js, Bun, Hono, and TypeScript.
- API design with Hono, edge runtimes, Web APIs, REST, and GraphQL.
- Database engineering with Drizzle ORM and PostgreSQL, alongside Prisma ORM, MongoDB, and MySQL.
- Performance optimization, Core Web Vitals, accessible interfaces, and reusable component systems.

## Writing

${blogLinks}

## Professional Profiles

- [GitHub](https://github.com/ioNihal): Open-source projects and developer work.
- [LinkedIn](https://www.linkedin.com/in/n1hal): Professional profile and experience.
- [Email](mailto:nihal04x@gmail.com): Contact Nihal directly.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}