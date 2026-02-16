import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header';

const mockToggleTheme = vi.fn();
let mockTheme = 'light';

vi.mock('../../context/ThemeContext', () => ({
  useThemeContext: () => ({
    theme: mockTheme,
    toggleTheme: mockToggleTheme,
  }),
}));

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockTheme = 'light';
  });

  it('renders the title', () => {
    render(<Header />);
    expect(screen.getByText('Where in the world?')).toBeInTheDocument();
  });

  it('shows "Dark Mode" text when theme is light', () => {
    mockTheme = 'light';
    render(<Header />);
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });

  it('shows "Light Mode" text when theme is dark', () => {
    mockTheme = 'dark';
    render(<Header />);
    expect(screen.getByText('Light Mode')).toBeInTheDocument();
  });

  it('calls toggleTheme when theme button is clicked', () => {
    render(<Header />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(button);
    expect(mockToggleTheme).toHaveBeenCalledOnce();
  });
});
