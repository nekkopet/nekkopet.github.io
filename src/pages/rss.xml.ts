import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@config";
import { slugifyStr } from "@utils/slugify";

export async function GET() {
  const posts = await getCollection("posts");
  const pages = await getCollection("pages");

  const items = [];

  items.push(...(pages.map(({ data }) => ({
    link: `${data.slug}`,
    title: data.Title,
    description: data.SEO?.metaDescription || '',
    pubDate: new Date(data.createdAt ?? data.updatedAt),
  }))));

  items.push(...(posts.map(({ data, id }) => ({
    link: `posts/${id}-${slugifyStr(data.Title)}`,
    title: data.Title,
    description: data.SEO?.metaDescription || '',
    pubDate: new Date(data.createdAt ?? data.updatedAt),
  }))));

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items,
  });
}
