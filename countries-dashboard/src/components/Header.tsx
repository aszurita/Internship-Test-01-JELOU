import { Moon, Sun, Globe } from 'lucide-react';
import { useThemeContext } from '../context/ThemeContext';

export const Header = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="bg-white dark:bg-dark-card shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Where in the world?
            </h1>
          </div>

          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <>
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-200" />
                <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">
                  Dark Mode
                </span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-200" />
                <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">
                  Light Mode
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
