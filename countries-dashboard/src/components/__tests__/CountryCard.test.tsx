import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CountryCard } from '../CountryCard';
import type { Country } from '../../hooks/types';

const mockToggleFavorite = vi.fn();
const mockIsFavorite = vi.fn(() => false);

vi.mock('../../context/FavoritesContext', () => ({
  useFavorites: () => ({
    toggleFavorite: mockToggleFavorite,
    isFavorite: mockIsFavorite,
  }),
}));

const mockCountry: Country = {
  cca3: 'COL',
  name: { common: 'Colombia', official: 'Republic of Colombia' },
  capital: ['Bogotá'],
  population: 50882891,
  region: 'Americas',
  flags: { png: 'https://flags.com/col.png', svg: 'https://flags.com/col.svg', alt: 'Flag of Colombia' },
};

describe('CountryCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the country name', () => {
    render(<CountryCard country={mockCountry} onClick={() => {}} />);
    expect(screen.getByText('Colombia')).toBeInTheDocument();
  });

  it('renders the capital', () => {
    render(<CountryCard country={mockCountry} onClick={() => {}} />);
    expect(screen.getByText('Bogotá')).toBeInTheDocument();
  });

  it('renders the population', () => {
    render(<CountryCard country={mockCountry} onClick={() => {}} />);
    expect(screen.getByText(mockCountry.population.toLocaleString())).toBeInTheDocument();
  });

  it('renders the region', () => {
    render(<CountryCard country={mockCountry} onClick={() => {}} />);
    expect(screen.getByText('Americas')).toBeInTheDocument();
  });

  it('renders the flag image with alt text', () => {
    render(<CountryCard country={mockCountry} onClick={() => {}} />);
    const img = screen.getByAltText('Flag of Colombia');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://flags.com/col.svg');
  });

  it('shows N/A when capital is undefined', () => {
    const countryNoCapital = { ...mockCountry, capital: undefined };
    render(<CountryCard country={countryNoCapital} onClick={() => {}} />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('calls onClick with cca3 when card is clicked', () => {
    const handleClick = vi.fn();
    render(<CountryCard country={mockCountry} onClick={handleClick} />);
    fireEvent.click(screen.getByText('Colombia'));
    expect(handleClick).toHaveBeenCalledWith('COL');
  });

  it('calls toggleFavorite when favorite button is clicked', () => {
    render(<CountryCard country={mockCountry} onClick={() => {}} />);
    const favButton = screen.getByRole('button', { name: /add to favorites/i });
    fireEvent.click(favButton);
    expect(mockToggleFavorite).toHaveBeenCalledWith('COL');
  });

  it('does not trigger card onClick when favorite button is clicked', () => {
    const handleClick = vi.fn();
    render(<CountryCard country={mockCountry} onClick={handleClick} />);
    const favButton = screen.getByRole('button', { name: /add to favorites/i });
    fireEvent.click(favButton);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows "Remove from favorites" label when country is favorited', () => {
    mockIsFavorite.mockReturnValue(true);
    render(<CountryCard country={mockCountry} onClick={() => {}} />);
    expect(screen.getByRole('button', { name: /remove from favorites/i })).toBeInTheDocument();
  });
});
