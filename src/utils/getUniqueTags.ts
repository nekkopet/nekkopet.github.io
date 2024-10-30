import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";

interface Tag {
  tag: string;
  tagName: string;
}

const getUniqueTags = (posts: CollectionEntry<"posts">[]) => {
  const tags: Tag[] = posts
    .flatMap(post => post.data.Tags)
    .map(tag => ({ tag: slugifyStr(tag.Label), tagName: tag.Label }))
    .filter(
      (value, index, self) =>
        self.findIndex(tag => tag.tag === value.tag) === index
    )
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
  return tags;
};

export default getUniqueTags;
