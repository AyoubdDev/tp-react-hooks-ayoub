import { useState, useEffect } from 'react';

const useProductSearch = (searchTerm = '') => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Exercice 4.2 - États de pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [originalProducts, setOriginalProducts] = useState([]);

  const limit = 9; // 9 produits par page
  const skip = (currentPage - 1) * limit;

  // ✅ Exercice 4.1 - Fonction de rechargement
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = `https://api.daaif.net/products?delay=1000&limit=${limit}&skip=${skip}`;

  

      const response = await fetch(url);
      if (!response.ok) throw new Error('Erreur réseau');

      const data = await response.json();





      setProducts(data.products || []);

      setOriginalProducts(data.products);
      setTotalPages(Math.ceil(data.total / limit));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Recharger à chaque changement de page ou de recherche
  useEffect(() => {
    fetchProducts();

    console.log("searchTerm", searchTerm);
    console.log("currentPage", currentPage);
    
  }, [ currentPage]);

useEffect(() => {
  const newData = originalProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setProducts(newData);
}, [searchTerm, originalProducts]);





  // Reset la page quand on tape une nouvelle recherche
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return {
    products,
    loading,
    error,
    reload: fetchProducts, // ✅ Exercice 4.1
    currentPage,
    totalPages,
    nextPage: () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)),
    previousPage: () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  };
};

export default useProductSearch;
