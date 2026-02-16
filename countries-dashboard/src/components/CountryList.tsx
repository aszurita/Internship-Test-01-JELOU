import { useState, useMemo, useCallback } from 'react';
import { Star } from 'lucide-react';
import { useCountries } from '../hooks/useCountries';
import { useFavorites } from '../context/FavoritesContext';
import { Region, SortOption, SortDirection } from '../hooks/types';
import { CountryCard } from './CountryCard';
import { CountryDetail } from './CountryDetail';
import { SearchFilter } from './filters/SearchFilter';
import { RegionFilter } from './filters/RegionFilter';
import { SortControls } from './sorts/SortControls';

export const CountryList = () => {
  const { countries, loading, error, retry, fetchFullCountryDetails } = useCountries();
  const { favorites } = useFavorites();
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState<Region>('All Regions');
  const [selectedCca3, setSelectedCca3] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredCountries = useMemo(() => {
    const filtered = countries.filter((c) => {
      const matchesSearch = c.name.common.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = region === 'All Regions' || c.region === region;
      const matchesFavorites = !showFavorites || favorites.includes(c.cca3);
      return matchesSearch && matchesRegion && matchesFavorites;
    });

    return [...filtered].sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.common.localeCompare(b.name.common);
      } else if (sortBy === 'population') {
        comparison = a.population - b.population;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [countries, search, region, sortBy, sortDirection, showFavorites, favorites]);

  const handleCardClick = useCallback((cca3: string) => {
    setSelectedCca3(cca3);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedCca3(null);
  }, []);

  const stableFetch = useCallback(fetchFullCountryDetails, [fetchFullCountryDetails]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-center px-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Service Temporarily Unavailable
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          We're experiencing issues connecting to our data service. This is
          usually temporary. Please try again in a few moments.
        </p>
        <button
          onClick={retry}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (selectedCca3) {
    return (
      <CountryDetail
        cca3={selectedCca3}
        fetchFullCountryDetails={stableFetch}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filters */}
      <div className="flex flex-col gap-4 mb-10">
        <SearchFilter search={search} onSearchChange={setSearch} />
        <div className="flex flex-wrap items-center gap-3">
          <SortControls
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortChange={setSortBy}
            onDirectionChange={setSortDirection}
          />
          <RegionFilter region={region} onRegionChange={setRegion} />
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              showFavorites
                ? 'bg-yellow-500 text-white shadow-md'
                : 'bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Star size={18} className={showFavorites ? 'fill-white' : ''} />
            Show Favorites
          </button>
        </div>
      </div>

      {/* Countries */}
      {filteredCountries.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
          No countries found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCountries.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              onClick={handleCardClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};
