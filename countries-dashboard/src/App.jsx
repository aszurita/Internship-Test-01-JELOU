import { Header } from './components/Header';
import { CountryList } from './components/CountryList';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
        <Header />
        <CountryList />
      </div>
    </ThemeProvider>
  )
}

export default App
