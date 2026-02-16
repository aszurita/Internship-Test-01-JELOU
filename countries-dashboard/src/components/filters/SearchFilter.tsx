import { Search } from 'lucide-react';

interface SearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const SearchFilter = ({ search, onSearchChange }: SearchFilterProps) => {
  return (
    <div className="relative w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-md outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
      />
    </div>
  );
};
