import { Country } from '../hooks/types';

interface CountryCardProps {
  country: Country;
  onClick: (cca3: string) => void;
}

export const CountryCard = ({ country, onClick }: CountryCardProps) => {
  return (
    <div
      onClick={() => onClick(country.cca3)}
      className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
    >
      <img
        src={country.flags.svg}
        alt={country.flags.alt || country.name.common}
        className="w-full h-44 object-cover"
      />
      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          {country.name.common}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-semibold">Capital: </span>
          {country.capital?.join(', ') || 'N/A'}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-semibold">Population: </span>
          {country.population.toLocaleString()}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-semibold">Region: </span>
          {country.region}
        </p>
      </div>
    </div>
  );
};
