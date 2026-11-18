import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "../src/content/site.js";
import { posts } from "../src/content/posts.js";
import { caseStudies } from "../src/content/caseStudies.js";
import { homePage } from "../src/templates/home.js";
import { articlePage, blogPage, notFoundPage, projectPage } from "../src/templates/pages.js";
import { document, escape } from "../src/templates/shared.js";

const root = fileURLToPath(new URL("../", import.meta.url));
export const output = join(root, "dist");

const pages = [
  homePage(),
  blogPage(),
  ...posts.map(articlePage),
  ...caseStudies.map((project, index) => projectPage(project, caseStudies[(index + 1) % caseStudies.length])),
  notFoundPage(),
];

function sitemap() {
  const now = new Date().toISOString().slice(0, 10);
  const entries = pages.filter((page) => !page.notFound).map((page) => {
    const priority = page.path === "/" ? "1.0" : page.path === "/blog" ? "0.8" : page.published ? "0.6" : "0.7";
    const frequency = ["/", "/blog"].includes(page.path) ? "weekly" : "monthly";
    return `  <url><loc>${escape(site.url + (page.path === "/" ? "" : page.path))}</loc><lastmod>${page.published ?? now}</lastmod><changefreq>${frequency}</changefreq><priority>${priority}</priority></url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
}

export async function build() {
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });

  for (const page of pages) {
    const path = page.path === "/" ? "index.html" : page.path.slice(1) + ".html";
    const file = join(output, path);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, document(page), "utf8");
  }

  await Promise.all([
    cp(join(root, "src/assets"), join(output, "assets"), { recursive: true }),
    writeFile(join(output, "sitemap.xml"), sitemap(), "utf8"),
    writeFile(join(output, "robots.txt"), `User-Agent: *\nAllow: /\nHost: ${site.url}\nSitemap: ${site.url}/sitemap.xml\n`, "utf8"),
  ]);
  console.log(`Built ${pages.length} pages in dist/.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await build();
