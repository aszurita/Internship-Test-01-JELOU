import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RegionFilter } from '../filters/RegionFilter';

describe('RegionFilter', () => {
  it('renders all region options', () => {
    render(<RegionFilter region="All Regions" onRegionChange={() => {}} />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(6);
    expect(options.map(o => o.textContent)).toEqual([
      'All Regions', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania',
    ]);
  });

  it('displays the current region as selected', () => {
    render(<RegionFilter region="Europe" onRegionChange={() => {}} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('Europe');
  });

  it('calls onRegionChange when a region is selected', () => {
    const handleChange = vi.fn();
    render(<RegionFilter region="All Regions" onRegionChange={handleChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Asia' } });
    expect(handleChange).toHaveBeenCalledWith('Asia');
  });
});
