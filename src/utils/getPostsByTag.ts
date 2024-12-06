import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";

const getPostsByTag = (posts: CollectionEntry<"posts">[], tag: string) =>
  posts.filter(post => {
    const tags = post.data.Tags.map((post_tag: { Label: string }) => slugifyStr(post_tag.Label));
    return tags.includes(tag);
  })

export default getPostsByTag;
