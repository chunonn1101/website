import { ArrowRight, MagnifyingGlass, X } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { products, designers } from "../data/products.js";
import { useStore } from "../context/StoreContext.jsx";
import { formatAED, slugify } from "../lib/format.js";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const matches = useMemo(() => q ? products.filter((product) => `${product.brand} ${product.name} ${product.category}`.toLowerCase().includes(q)).slice(0, 5) : [], [q]);
  const brandMatches = q ? designers.filter((brand) => brand.toLowerCase().includes(q)).slice(0, 4) : [];
  if (!searchOpen) return null;

  return (
    <div className="overlay search-overlay" role="dialog" aria-modal="true" aria-label="Search MODEX">
      <div className="overlay-top">
        <p className="overlay-title">Search MODEX</p>
        <button className="icon-button" onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={26} /></button>
      </div>
      <div className="search-field-wrap">
        <MagnifyingGlass size={28} aria-hidden="true" />
        <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search designers, products and categories" aria-label="Search" />
      </div>
      {!q ? (
        <div className="search-suggestions">
          <div><p className="eyebrow">Recent Searches</p><button onClick={() => setQuery("Chanel")}>Chanel</button><button onClick={() => setQuery("Watches")}>Watches</button></div>
          <div><p className="eyebrow">Trending</p><button onClick={() => setQuery("New arrivals")}>New arrivals</button><button onClick={() => setQuery("Bottega Veneta")}>Bottega Veneta</button></div>
        </div>
      ) : (
        <div className="search-results">
          <section>
            <p className="eyebrow">Designers</p>
            {brandMatches.length ? brandMatches.map((brand) => <Link key={brand} onClick={() => setSearchOpen(false)} to={`/designer/${slugify(brand)}`}>{brand}<ArrowRight size={16} /></Link>) : <p className="muted">No matching designers.</p>}
          </section>
          <section className="search-product-results">
            <p className="eyebrow">Products</p>
            {matches.length ? matches.map((product) => (
              <Link key={product.id} to={`/product/${product.slug}`} onClick={() => setSearchOpen(false)}>
                <img src={product.images[0]} alt="" />
                <span><strong>{product.brand}</strong>{product.name}<small>{formatAED(product.price)}</small></span>
                <ArrowRight size={18} />
              </Link>
            )) : <p className="muted">No products found for “{query}”.</p>}
          </section>
        </div>
      )}
    </div>
  );
}
