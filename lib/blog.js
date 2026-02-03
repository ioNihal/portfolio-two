import fs from 'fs';
import path from 'path';
import matter from "gray-matter"


const POST_DIR = path.join(process.cwd(), "content/blog");

/**
 * Reads and returns the contents of a blog post MDX file by its slug.
 *
 * @param {string} slug - The unique identifier of the post (file name without `.mdx`).
 * @returns {{ content: string, frontMatter: Record<string, any> }}
 * @throws {Error} If the file does not exist or cannot be read.
 */
export function getPost(slug) {
    const filePath = path.join(POST_DIR, `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf-8");

    const { content, data } = matter(raw);

    return {
        content,
        frontMatter: data,
    };
}


/**
 * Returns all blog post slugs by reading MDX files from the posts directory.
 *
 * @returns {string[]} An array of post slugs (file names without the `.mdx` extension).
 * @throws {Error} If the posts directory cannot be read.
 */
export function getSlugs() {
    return fs
        .readdirSync(POST_DIR)
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(/\.mdx$/, ""));
}


export function formatDate(dateString) {
    if (!dateString) return null;

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}


export function truncateTitle(title, max = 20) {
    if (!title) return "";
    return title.length > max
        ? `${title.slice(0, max)}…`
        : title;
}
