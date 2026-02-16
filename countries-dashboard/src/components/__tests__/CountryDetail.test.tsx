import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CountryDetail } from '../CountryDetail';
import type { Country } from '../../hooks/types';

const mockCountry: Country = {
  cca3: 'COL',
  name: {
    common: 'Colombia',
    official: 'Republic of Colombia',
    nativeName: { spa: { official: 'República de Colombia', common: 'Colombia' } },
  },
  capital: ['Bogotá'],
  population: 50882891,
  region: 'Americas',
  subregion: 'South America',
  flags: { png: 'https://flags.com/col.png', svg: 'https://flags.com/col.svg', alt: 'Flag of Colombia' },
  languages: { spa: 'Spanish' },
  currencies: { COP: { name: 'Colombian peso', symbol: '$' } },
  borders: ['BRA', 'ECU', 'PAN', 'PER', 'VEN'],
  tld: ['.co'],
};

describe('CountryDetail', () => {
  let mockFetch: ReturnType<typeof vi.fn>;
  let mockOnBack: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFetch = vi.fn();
    mockOnBack = vi.fn();
  });

  it('shows a loading spinner initially', () => {
    mockFetch.mockReturnValue(new Promise(() => {})); // never resolves
    render(<CountryDetail cca3="COL" fetchFullCountryDetails={mockFetch} onBack={mockOnBack} />);
    expect(screen.queryByText('Colombia')).not.toBeInTheDocument();
  });

  it('renders country details after loading', async () => {
    mockFetch.mockResolvedValue(mockCountry);
    render(<CountryDetail cca3="COL" fetchFullCountryDetails={mockFetch} onBack={mockOnBack} />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Colombia' })).toBeInTheDocument();
    });

    expect(screen.getByText(mockCountry.population.toLocaleString())).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText('South America')).toBeInTheDocument();
    expect(screen.getByText('Bogotá')).toBeInTheDocument();
    expect(screen.getByText('.co')).toBeInTheDocument();
    expect(screen.getByText('Spanish')).toBeInTheDocument();
    expect(screen.getByText(/Colombian peso/)).toBeInTheDocument();
  });

  it('renders border countries', async () => {
    mockFetch.mockResolvedValue(mockCountry);
    render(<CountryDetail cca3="COL" fetchFullCountryDetails={mockFetch} onBack={mockOnBack} />);

    await waitFor(() => {
      expect(screen.getByText('BRA')).toBeInTheDocument();
    });
    expect(screen.getByText('ECU')).toBeInTheDocument();
    expect(screen.getByText('PER')).toBeInTheDocument();
  });

  it('shows "Country not found." when fetch returns null', async () => {
    mockFetch.mockResolvedValue(null);
    render(<CountryDetail cca3="XXX" fetchFullCountryDetails={mockFetch} onBack={mockOnBack} />);

    await waitFor(() => {
      expect(screen.getByText('Country not found.')).toBeInTheDocument();
    });
  });

  it('calls onBack when Back button is clicked', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValue(mockCountry);
    render(<CountryDetail cca3="COL" fetchFullCountryDetails={mockFetch} onBack={mockOnBack} />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Colombia' })).toBeInTheDocument();
    });

    await user.click(screen.getByText('Back'));
    expect(mockOnBack).toHaveBeenCalledOnce();
  });

  it('calls fetchFullCountryDetails with the cca3 code', () => {
    mockFetch.mockReturnValue(new Promise(() => {}));
    render(<CountryDetail cca3="COL" fetchFullCountryDetails={mockFetch} onBack={mockOnBack} />);
    expect(mockFetch).toHaveBeenCalledWith('COL');
  });
});
