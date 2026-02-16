import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchFilter } from '../filters/SearchFilter';

describe('SearchFilter', () => {
  it('renders the search input with placeholder', () => {
    render(<SearchFilter search="" onSearchChange={() => {}} />);
    expect(screen.getByPlaceholderText('Search for a country...')).toBeInTheDocument();
  });

  it('displays the current search value', () => {
    render(<SearchFilter search="Colombia" onSearchChange={() => {}} />);
    const input = screen.getByPlaceholderText('Search for a country...') as HTMLInputElement;
    expect(input.value).toBe('Colombia');
  });

  it('calls onSearchChange when typing', () => {
    const handleChange = vi.fn();
    render(<SearchFilter search="" onSearchChange={handleChange} />);
    const input = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(input, { target: { value: 'Peru' } });
    expect(handleChange).toHaveBeenCalledWith('Peru');
  });
});
