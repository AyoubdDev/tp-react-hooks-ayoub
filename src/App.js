import React, { createContext, useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';

// ✅ Exercice 2.1 - Créer les Contexts
export const ThemeContext = createContext();
export const LanguageContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [language, setLanguage] = useState('fr'); // ✅ Exercice 2.2
  const [searchTerm, setSearchTerm] = useState(''); // pour la recherche

  const translations = {
    fr: {
      title: "Catalogue de Produits",
      selectLanguage: "Langue"
    },
    en: {
      title: "Product Catalog",
      selectLanguage: "Language"
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
          <header className="my-4">
            <h1 className="text-center">{translations[language].title}</h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />

              {/* ✅ Exercice 2.2 - Sélecteur de langue */}
              <select
                className={`form-select w-auto ${isDarkTheme ? 'bg-dark text-light border-light' : 'bg-light'}`}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
          </header>

          <main>
          <ProductSearch onSearch={(term) => setSearchTerm(term)} />
<ProductList searchTerm={searchTerm} />
          </main>
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
