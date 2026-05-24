// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://wlinterior.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const projectCategories = [
  "kitchens",
  "bathrooms",
  "living-spaces",
  "bedrooms",
  "full-renovation",
  "millwork",
  "commercial",
];

const millworkCategories = [
  "vanities",
  "built-ins",
  "closets",
  "bars",
  "mudrooms",
  "office",
];

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/projects", changefreq: "weekly", priority: "0.9" },
  ...projectCategories.map((c) => ({
    path: `/projects/${c}`,
    changefreq: "monthly" as const,
    priority: "0.7",
  })),
  { path: "/millwork", changefreq: "weekly", priority: "0.9" },
  ...millworkCategories.map((c) => ({
    path: `/millwork/${c}`,
    changefreq: "monthly" as const,
    priority: "0.7",
  })),
  { path: "/before-after", changefreq: "monthly", priority: "0.7" },
  { path: "/consultation", changefreq: "monthly", priority: "0.9" },
];

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n")
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
