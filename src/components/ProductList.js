import React, { useContext } from 'react';
import { ThemeContext, LanguageContext } from '../App';
import useProductSearch from '../hooks/useProductSearch';

const ProductList = ({ searchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext); // ✅ Exercice 2.1

  const translations = {
    fr: {
      loading: 'Chargement...',
      error: 'Erreur',
      price: 'Prix',
      reload: 'Recharger',
      prev: 'Précédent',
      next: 'Suivant',
      page: 'Page'
    },
    en: {
      loading: 'Loading...',
      error: 'Error',
      price: 'Price',
      reload: 'Reload',
      prev: 'Previous',
      next: 'Next',
      page: 'Page'
    }
  };

  const { 
    products, 
    loading, 
    error,
    reload,
    currentPage,
    totalPages,
    nextPage,
    previousPage
  } = useProductSearch(searchTerm)
  if (loading) return (
    <div className="text-center my-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">{translations[language].loading}</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger" role="alert">
      {translations[language].error}: {error}
    </div>
  );

  return (
    <div>
      {/* ✅ Exercice 4.1 - Bouton de rechargement */}
      <div className="text-center my-3">
        <button className="btn btn-secondary" onClick={reload}>
          🔁 {translations[language].reload}
        </button>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map(product => (
          <div key={product.id} className="col">
            <div className={`card h-100 ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
              {product.thumbnail && (
                <img
                  src={product.thumbnail}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>{translations[language].price} : </strong>
                  {product.price}€
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductList;
