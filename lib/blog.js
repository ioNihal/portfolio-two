import fs from 'fs';
import path from 'path';


const POST_DIR = path.join(process.cwd(), "content/blog");

/**
 * Reads and returns the contents of a blog post MDX file by its slug.
 *
 * @param {string} slug - The unique identifier of the post (file name without `.mdx`).
 * @returns {string} The raw MDX content of the post.
 * @throws {Error} If the file does not exist or cannot be read.
 */
export function getPost(slug) {
    const filePath = path.join(POST_DIR, `${slug}.mdx`);
    return fs.readFileSync(filePath, "utf-8");
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