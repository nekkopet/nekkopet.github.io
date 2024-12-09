import { slug as slugger } from "github-slugger";

export const slugifyStr = (str: string) => slugger(
  (str || '')
    .trim()
    .toLowerCase()
    .replace(/[,;:.]/, '')
    .replace(/[&]|and/, 'y')
    .replace(/[^a-zA-Z0-9-_ ]/g, 'x') // Remove non-alphanumeric characters except hyphens and underscores
    .replace(/\s+/g, '-') // Replace spaces with hyphens
);

export const slugifyAll = (arr: string[]) => arr.map(str => slugifyStr(str));
