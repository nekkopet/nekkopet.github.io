import type { FC } from 'react';

interface Props {
  href: string;
  title: string;
  description: string;
  icon?: string;
}

const PageCard: FC<Props> = ({ href, title, description, icon = "📄" }) => {
  return (
    <li className="w-full mb-4">
      <a
        href={href}
        className="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-accent-500 dark:hover:border-accent-500 transition-all duration-300"
      >
        <div className="flex items-start space-x-4">
          <span className="text-2xl" role="img" aria-label="page icon">
            {icon}
          </span>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-accent-500">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {description}
            </p>
          </div>
          <div className="text-accent-500 dark:text-accent-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </a>
    </li>
  );
}

export default PageCard;
