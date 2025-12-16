import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export function ProductCard({ product }) {
  const shortDesc = product?.description
    ? product.description.length > 100
      ? product.description.slice(0, 100) + "..."
      : product.description
    : "";

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card border-0 shadow h-100 product-card clean-card">
        <div
          className="d-flex align-items-center justify-content-center p-3"
          style={{ height: 220 }}
        >
          <img
            src={product?.image}
            className="img-fluid"
            alt={product?.title}
            style={{ maxHeight: "100%", objectFit: "contain" }}
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h6 className="product-title mb-1" title={product?.title}>
            {product?.title}
          </h6>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="text-muted small">{product?.category}</div>
            <div className="fw-bold text-primary">${product?.price}</div>
          </div>
          <p className="card-text text-muted small mb-3 line-clamp-2">
            {shortDesc}
          </p>
          <div className="mt-auto d-flex justify-content-between align-items-center">
            <small className="text-muted">ID: {product?.id}</small>
            <button className="btn btn-sm btn-outline-secondary">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function Products() {
  const [products, setProducts] = useState([]);
  const getProducts = useCallback(async () => {
    try{

        const response = await axios({
            url: "https://fakestoreapi.com/products",
            // timeout: 100
        });
        setProducts(response.data);
    }catch(error){
        alert('Failed to fetch products: ',error);
    }
  }, []);
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <>
      <div className="container">
        <h1 className="text-center my-3">Products</h1>
        <div className="row">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
