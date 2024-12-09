import Tag from './Tag.astro';
import type { SEO } from '../interfaces/Article';
import { Fragment } from 'react';

export interface Props {
  href?: string;
  author?: string;
  tags: string[];
  frontmatter: {
    title: string;
    pubDatetime: Date;
    modDatetime: Date;
    description: string;
    SEO?: SEO;
    author?: string;
  };
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, tags, secHeading = true }: Props) {
  const { title, pubDatetime, description, SEO } = frontmatter;
  const imageUrl = SEO?.socialImage?.url;

  return (
    <li className="mb-8 w-full md:w-1/2 px-4">
      <article className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
        <a href={href} className="block group">
          {imageUrl && (
            <div className="relative aspect-video overflow-hidden">
              <img
                src={imageUrl}
                alt={SEO?.socialImage?.alternativeText || title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                width={SEO?.socialImage?.width}
                height={SEO?.socialImage?.height}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}
          <div className="p-6">
            {secHeading ? (
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent-500 transition-colors">
                {title}
              </h2>
            ) : (
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent-500 transition-colors">
                {title}
              </h3>
            )}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 text-xs font-medium bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300 rounded-full">
                {new Date(pubDatetime).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
              {description}
            </p>
            <div className="flex items-center text-accent-500 dark:text-accent-400 font-medium">
              Read more
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 7l5 5-5 5" />
              </svg>
            </div>
            {/* <ul>
              {
                tags?.map((tag: string, index: number) => (
                  <Fragment key={index}>
                    {tag && <Tag tag={tag} size="sm" />}
                  </Fragment>
                ))
              }
            </ul> */}
          </div>
        </a>
      </article>
    </li>
  );
}
