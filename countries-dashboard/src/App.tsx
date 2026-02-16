import { Header } from './components/Header';
import { CountryList } from './components/CountryList';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
          <Header />
          <CountryList />
        </main>
      </FavoritesProvider>
    </ThemeProvider>
  )
}

export default App
