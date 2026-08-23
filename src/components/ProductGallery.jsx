import { useState } from "react";

export function ProductGallery({ product }) {
  const [active, setActive] = useState(0);
  const images = [product.images[0], product.images[1], product.images[0], product.images[1]];
  return (
    <div className="product-gallery">
      <div className="product-gallery-grid">
        {images.map((image, index) => <button key={index} className={active === index ? "active" : ""} onClick={() => setActive(index)} aria-label={`View product image ${index + 1}`}><img src={image} alt={index === 0 ? `${product.brand} ${product.name}` : ""} /></button>)}
      </div>
      <div className="gallery-dots" aria-label="Product gallery position">{images.map((_, index) => <button key={index} className={active === index ? "active" : ""} onClick={() => setActive(index)} aria-label={`Image ${index + 1}`} />)}</div>
    </div>
  );
}
