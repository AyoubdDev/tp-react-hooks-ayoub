import React, { createContext, use, useEffect, useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';


export const ThemeContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState();
 
  const [searchTerm, setSearchTerm] = useState(''); // pour la recherche






    
    

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>

        <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
          <header className="my-4">
            <h1 className="text-center">Product Catalog</h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />

            </div>
          </header>

          <main>
          <ProductSearch onSearch={(term) => setSearchTerm(term)} />
<ProductList searchTerm={searchTerm} />
          </main>
        </div>

    </ThemeContext.Provider>
  );
};

export default App;
