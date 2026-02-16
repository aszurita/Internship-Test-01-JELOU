import { useState, useEffect } from 'react';
import { Country } from './types';

interface UseCountriesReturn {
  countries: Country[];
  loading: boolean;
  error: string | null;
  retry: () => void;
  fetchFullCountryDetails: (cca3: string) => Promise<Country | null>;
}

const CARD_FIELDS = [
  'name',
  'flags',
  'capital',
  'population',
  'region',
  'cca3',
].join(',');

const LIST_ENDPOINT = `https://restcountries.com/v3.1/all?fiels=${CARD_FIELDS}`;

export const useCountries = (): UseCountriesReturn => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  const fetchCountries = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(LIST_ENDPOINT, {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: Country[] = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No countries data received');
      }
      
      setCountries(data);
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Request timeout. Please try again.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to fetch countries. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchFullCountryDetails = async (cca3: string): Promise<Country | null> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`, {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Countries data:', data[0]);

      return data[0] as Country;
    } catch (err) {
      console.error('Error fetching country details:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchCountries();
  }, [retryCount]);

  const retry = () => {
    setRetryCount(prev => prev + 1);
  };

  return { 
    countries, 
    loading, 
    error, 
    retry,
    fetchFullCountryDetails 
  };
};