import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../App';

const ThemeToggle = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

 
  return (
    <button
onClick={() => {
  const newValue = !isDarkTheme;
  setIsDarkTheme(newValue);
  localStorage.setItem('isDarkTheme', newValue);
}}

      className={`px-5 py-2 rounded ${
        isDarkTheme 
          ? 'bg-dark text-light border border-light' 
          : 'bg-light text-dark border border-dark'
      }`}
    >
      {isDarkTheme ? 'Mode Clair' : 'Mode Sombre'}
    </button>
  );
};

export default ThemeToggle;