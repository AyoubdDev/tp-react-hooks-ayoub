import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext, LanguageContext } from '../App';
import useDebounce from '../hooks/useDebounce';

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // ✅ Exercice 1.2

  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);          // ✅ Exercice 2.1

  const translations = {
    fr: {
      placeholder: 'Rechercher un produit...'
    },
    en: {
      placeholder: 'Search for a product...'
    }
  };

  // Appel du parent à chaque changement après debounce
  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={translations[language].placeholder}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;
