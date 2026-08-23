import { ArrowCounterClockwise, CreditCard, Heart, ShieldCheck, Truck } from "@phosphor-icons/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthenticationSection } from "../components/AuthenticationSection.jsx";
import { Breadcrumb } from "../components/Breadcrumb.jsx";
import { ProductGallery } from "../components/ProductGallery.jsx";
import { ProductGrid } from "../components/ProductGrid.jsx";
import { VerifiedBadge } from "../components/Brand.jsx";
import { WishlistButton } from "../components/ProductCard.jsx";
import { conditionCopy, getProduct, products } from "../data/products.js";
import { useStore } from "../context/StoreContext.jsx";
import { formatAED, useDocumentMeta } from "../lib/format.js";

export function ProductPage() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const navigate = useNavigate();
  const { addToCart } = useStore();
  useDocumentMeta(product ? `${product.brand} ${product.name}` : "Piece not found", product?.description);
  if (!product) return <div className="empty-state"><h1>Piece not found.</h1><Link className="button button-dark" to="/shop">RETURN TO SHOP</Link></div>;
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);

  return (
    <main className="product-page">
      <div className="page-shell"><Breadcrumb items={[{ label: "Shop", to: "/shop" }, { label: product.category, to: `/categories/${product.category}` }, { label: product.name }]} />
        <div className="product-layout"><ProductGallery product={product} /><aside className="product-info"><div className="product-info-top"><p className="eyebrow">{product.brand}</p><h1>{product.name}</h1><p className="product-info-price">{formatAED(product.price)}</p><div className="condition-line"><span>CONDITION</span><strong>{product.condition}</strong><button className="text-button" onClick={() => document.getElementById("condition-guide")?.scrollIntoView({ behavior: "smooth" })}>Condition guide</button></div></div>
          <dl className="product-specs"><div><dt>Colour</dt><dd>{product.colour}</dd></div><div><dt>Material</dt><dd>{product.material}</dd></div><div><dt>Year</dt><dd>{product.year}</dd></div><div><dt>Includes</dt><dd>{product.includedItems.join(", ")}</dd></div></dl>
          <p className="product-description">{product.description}</p>
          <div className="product-actions"><button className="button button-dark button-block" onClick={() => addToCart(product.id)}>ADD TO BAG</button><button className="button button-outline button-block" onClick={() => { addToCart(product.id, false); navigate("/checkout"); }}>BUY NOW</button><div className="wishlist-row"><WishlistButton productId={product.id} /><span>Add to wishlist</span></div></div>
          <VerifiedBadge />
          <div className="product-assurances"><div><ShieldCheck size={21} /><span><strong>AUTHENTICATED BY MODEX</strong>Independent multi-point inspection.</span></div><div><Truck size={21} /><span><strong>WORLDWIDE SHIPPING</strong>Tracked delivery from the UAE.</span></div><div><CreditCard size={21} /><span><strong>SECURE PAYMENT</strong>Protected checkout experience.</span></div><div><ArrowCounterClockwise size={21} /><span><strong>RETURNS AVAILABLE</strong>Return within 14 days.</span></div></div>
        </aside></div>
      </div>
      <section className="condition-guide" id="condition-guide"><div><p className="eyebrow gold">A CLEAR STANDARD</p><h2>CONDITION GUIDE</h2></div><div>{Object.entries(conditionCopy).map(([label, copy]) => <div key={label}><h3>{label}</h3><p>{copy}</p></div>)}</div></section>
      <AuthenticationSection compact />
      <section className="section"><div className="section-head"><h2>YOU MAY ALSO LIKE</h2></div><ProductGrid products={related} /></section>
    </main>
  );
}
