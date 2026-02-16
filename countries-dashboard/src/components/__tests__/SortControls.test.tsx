import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SortControls } from '../sorts/SortControls';

describe('SortControls', () => {
  const defaultProps = {
    sortBy: 'name' as const,
    sortDirection: 'asc' as const,
    onSortChange: vi.fn(),
    onDirectionChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Name and Population sort buttons', () => {
    render(<SortControls {...defaultProps} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Population')).toBeInTheDocument();
  });

  it('calls onSortChange when Population button is clicked', () => {
    render(<SortControls {...defaultProps} />);
    fireEvent.click(screen.getByText('Population'));
    expect(defaultProps.onSortChange).toHaveBeenCalledWith('population');
  });

  it('calls onSortChange when Name button is clicked', () => {
    render(<SortControls {...defaultProps} sortBy="population" />);
    fireEvent.click(screen.getByText('Name'));
    expect(defaultProps.onSortChange).toHaveBeenCalledWith('name');
  });

  it('toggles direction from asc to desc when direction button is clicked', () => {
    render(<SortControls {...defaultProps} />);
    const directionButton = screen.getByTitle('Ascending');
    fireEvent.click(directionButton);
    expect(defaultProps.onDirectionChange).toHaveBeenCalledWith('desc');
  });

  it('toggles direction from desc to asc when direction button is clicked', () => {
    render(<SortControls {...defaultProps} sortDirection="desc" />);
    const directionButton = screen.getByTitle('Descending');
    fireEvent.click(directionButton);
    expect(defaultProps.onDirectionChange).toHaveBeenCalledWith('asc');
  });
});
