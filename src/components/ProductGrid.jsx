import { ProductCard } from "./ProductCard.jsx";

export function ProductGrid({ products, className = "" }) {
  return (
    <div className={`product-grid ${className}`}>
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
