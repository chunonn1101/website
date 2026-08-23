import { Heart } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { formatAED } from "../lib/format.js";
import { useStore } from "../context/StoreContext.jsx";

export function WishlistButton({ productId, onDark = false }) {
  const { wishlist, toggleWishlist } = useStore();
  const active = wishlist.includes(productId);
  return (
    <button
      className={`icon-button wishlist-button ${active ? "active" : ""} ${onDark ? "on-dark" : ""}`}
      onClick={(event) => { event.preventDefault(); event.stopPropagation(); toggleWishlist(productId); }}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
    >
      <Heart size={21} weight={active ? "fill" : "regular"} />
    </button>
  );
}

export function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.slug}`} className="product-card-link">
        <div className="product-card-media">
          <img src={product.images[0]} alt={`${product.brand} ${product.name}`} loading="lazy" />
          <img className="product-card-alt" src={product.images[1] || product.images[0]} alt="" loading="lazy" aria-hidden="true" />
          <WishlistButton productId={product.id} />
          {product.newArrival && <span className="product-tag">NEW</span>}
        </div>
        <div className="product-card-copy">
          <p className="eyebrow">{product.brand}</p>
          <h3>{product.name}</h3>
          <p className="product-condition">{product.condition} Condition</p>
          <p className="product-price">{formatAED(product.price)}</p>
        </div>
      </Link>
    </article>
  );
}
