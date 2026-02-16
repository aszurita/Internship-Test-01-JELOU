import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Country } from '../hooks/types';

interface CountryDetailProps {
  cca3: string;
  fetchFullCountryDetails: (cca3: string) => Promise<Country | null>;
  onBack: () => void;
}

export const CountryDetail = ({ cca3, fetchFullCountryDetails, onBack }: CountryDetailProps) => {
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchFullCountryDetails(cca3);
      setCountry(data);
      setLoading(false);
    };
    load();
  }, [cca3, fetchFullCountryDetails]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-dark-card shadow-md rounded-lg text-gray-900 dark:text-white hover:shadow-lg transition-shadow mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <p className="text-center text-gray-500 dark:text-gray-400">Country not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-dark-card shadow-md rounded-lg text-gray-900 dark:text-white hover:shadow-lg transition-shadow mb-10"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <img
          src={country.flags.svg}
          alt={country.flags.alt || country.name.common}
          className="w-full rounded-lg shadow-lg"
        />

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {country.name.common}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2">
            {/* Left column */}
            <div className="space-y-2">
              {country.name.nativeName && (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Native Name: </span>
                  {Object.values(country.name.nativeName).map(n => n.common).join(', ')}
                </p>
              )}
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Population: </span>
                {country.population.toLocaleString()}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Region: </span>
                {country.region}
              </p>
              {country.subregion && (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Sub Region: </span>
                  {country.subregion}
                </p>
              )}
              {country.capital && (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Capital: </span>
                  {country.capital.join(', ')}
                </p>
              )}
            </div>

            {/* Right column */}
            <div className="space-y-2">
              {country.tld && (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Top Level Domain: </span>
                  {country.tld.join(', ')}
                </p>
              )}
              {country.currencies && (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Currencies: </span>
                  {Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')}
                </p>
              )}
              {country.languages && (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Languages: </span>
                  {Object.values(country.languages).join(', ')}
                </p>
              )}
            </div>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div className="mt-8">
              <span className="font-semibold text-gray-900 dark:text-white text-sm">Border Countries: </span>
              <div className="inline-flex flex-wrap gap-2 mt-2">
                {country.borders.map(border => (
                  <span
                    key={border}
                    className="px-4 py-1 bg-white dark:bg-dark-card shadow-sm rounded text-sm text-gray-700 dark:text-gray-300"
                  >
                    {border}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
