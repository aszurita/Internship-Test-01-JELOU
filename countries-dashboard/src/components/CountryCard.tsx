import { Star } from 'lucide-react';
import { Country } from '../hooks/types';
import { useFavorites } from '../context/FavoritesContext';

interface CountryCardProps {
  country: Country;
  onClick: (cca3: string) => void;
}

export const CountryCard = ({ country, onClick }: CountryCardProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(country.cca3);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(country.cca3);
  };

  return (
    <div
      onClick={() => onClick(country.cca3)}
      className="relative bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
    >
      <button
        onClick={handleFavoriteClick}
        aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
      >
        <Star
          size={20}
          className={favorited ? 'text-yellow-400 fill-yellow-400' : 'text-white'}
        />
      </button>
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
