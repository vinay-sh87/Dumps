import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo
} from 'react';

import {
  fetchProducts,
  fetchProductById,
  fetchCategories
} from '../api/productsApi';

const ProductsContext = createContext(null);

const DEFAULT_FILTERS = {
  category: null,
  minPrice: null,
  maxPrice: null,
  rating: null,
  brand: null
};

export const ProductsProvider = ({ children }) => {
  /* ---------- STATE ---------- */
  const [products, setProducts] = useState([]);
  const [productMap, setProductMap] = useState({}); // O(1) lookup
  const [categories, setCategories] = useState([]);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState('relevance');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ---------- FETCH PRODUCTS ---------- */
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchProducts({
        ...filters,
        sort,
        page,
        limit: pageSize
      });

      setProducts(res.data.items);

      // normalize products for fast lookup
      const map = {};
      res.data.items.forEach(p => {
        map[p.id] = p;
      });

      setProductMap(prev => ({ ...prev, ...map }));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [filters, sort, page, pageSize]);

  /* ---------- FETCH CATEGORIES ONCE ---------- */
  useEffect(() => {
    fetchCategories()
      .then(res => setCategories(res.data))
      .catch(() => {});
  }, []);

  /* ---------- REFETCH WHEN QUERY CHANGES ---------- */
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  /* ---------- SINGLE PRODUCT (CACHE FIRST) ---------- */
  const getProductById = useCallback(
    async (id) => {
      if (productMap[id]) return productMap[id];

      const res = await fetchProductById(id);
      setProductMap(prev => ({ ...prev, [id]: res.data }));
      return res.data;
    },
    [productMap]
  );

  /* ---------- FILTER / SORT HELPERS ---------- */
  const updateFilters = useCallback((newFilters) => {
    setPage(1);
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  /* ---------- MEMOIZED VALUE ---------- */
  const value = useMemo(() => ({
    products,
    categories,
    loading,
    error,

    filters,
    sort,
    page,
    pageSize,

    setSort,
    setPage,

    updateFilters,
    clearFilters,

    getProductById,
    refetchProducts: loadProducts
  }), [
    products,
    categories,
    loading,
    error,
    filters,
    sort,
    page,
    pageSize,
    loadProducts,
    updateFilters,
    clearFilters,
    getProductById
  ]);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

/* ---------- CUSTOM HOOK ---------- */
export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error('useProducts must be used inside ProductsProvider');
  }
  return ctx;
};
