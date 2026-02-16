import { Region } from '../../hooks/types';

const REGIONS: Region[] = ['All Regions', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

interface RegionFilterProps {
  region: Region;
  onRegionChange: (value: Region) => void;
}

export const RegionFilter = ({ region, onRegionChange }: RegionFilterProps) => {
  return (
    <select
      value={region}
      onChange={(e) => onRegionChange(e.target.value as Region)}
      className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white dark:bg-dark-card text-sm sm:text-base text-gray-900 dark:text-white shadow-md outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none min-w-35 sm:min-w-45"
    >
      {REGIONS.map((r) => (
        <option key={r} value={r}>
          {r}
        </option>
      ))}
    </select>
  );
};
