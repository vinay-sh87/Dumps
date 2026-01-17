import { useEffect, useState } from "react";
import productsApi from "../api/products.api";
import Product from "../components/Product";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productsApi.getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <>
      <div className="container mx-auto w-full flex p-5">
        {loading && <p>Loading products</p>}
        <div className="filters">
          <h2 className="text-xl font-semibold my-5">Filters</h2>
          <div>
            <h3 className="text-sm font-semibold mb-2">Categories</h3>
            <select
              className="border border-gray-300 rounded-md bg-white text-sm px-3 py-1 focus:ring-1 shadow-sm focus:border-black focus:outline-none focus:ring-black"
              name=""
              id=""
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
