import { ArrowUpAZ, ArrowDownAZ, ArrowUp01, ArrowDown10 } from 'lucide-react';
import { SortOption, SortDirection } from '../../hooks/types';

interface SortControlsProps {
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSortChange: (option: SortOption) => void;
  onDirectionChange: (direction: SortDirection) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'name', label: 'Name' },
  { value: 'population', label: 'Population' },
];

export const SortControls = ({
  sortBy,
  sortDirection,
  onSortChange,
  onDirectionChange,
}: SortControlsProps) => {
  const directionIcon =
    sortBy === 'name'
      ? sortDirection === 'asc'
        ? ArrowUpAZ
        : ArrowDownAZ
      : sortDirection === 'asc'
        ? ArrowUp01
        : ArrowDown10;

  const DirectionIcon = directionIcon;

  return (
    <div className="flex items-center gap-2">
      {/* Sort option pills */}
      {SORT_OPTIONS.map((option) => {
        const isActive = sortBy === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30'
                : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {option.label}
          </button>
        );
      })}

      {/* Direction toggle */}
      <button
        onClick={() =>
          onDirectionChange(sortDirection === 'asc' ? 'desc' : 'asc')
        }
        className="p-2 rounded-full bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
        title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
      >
        <DirectionIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
