import { useTheme } from '../contexts/ThemeModeContext';

interface CardProps {
  title: string;
  content: string;
}

export function Card({ title, content }: CardProps) {
  const { theme } = useTheme();

  return (
    <div className="max-w-sm rounded-lg shadow-md p-6 bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300">{content}</p>
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Current theme: {theme}
      </div>
    </div>
  );
}