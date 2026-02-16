import { createContext, useContext, useCallback, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (cca3: string) => void;
  isFavorite: (cca3: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);

  const toggleFavorite = useCallback((cca3: string) => {
    setFavorites(
      favorites.includes(cca3)
        ? favorites.filter((id) => id !== cca3)
        : [...favorites, cca3]
    );
  }, [setFavorites]);

  const isFavorite = useCallback((cca3: string) => {
    return favorites.includes(cca3);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
