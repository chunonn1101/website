import { ArrowRight, CreditCard, ShieldCheck, Truck } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { AuthenticationSection } from "../components/AuthenticationSection.jsx";
import { ProductGrid } from "../components/ProductGrid.jsx";
import { designers, products } from "../data/products.js";
import { assetUrl, slugify, useDocumentMeta } from "../lib/format.js";

export function HomePage() {
  useDocumentMeta("Second-Hand Luxury Trading Platform", "Buy and sell authenticated second-hand luxury bags, clothing, watches, shoes and accessories on MODEX.");
  return (
    <>
      <section className="hero">
        <img className="hero-image" src={assetUrl("hero.webp")} alt="Oxblood leather bag and silver watch on travertine" />
        <div className="hero-copy"><p className="eyebrow hero-platform-label">SECOND-HAND LUXURY TRADING PLATFORM</p><h1><span>PRE-OWNED.</span><br />REDEFINED.</h1><p>Buy and sell curated second-hand luxury.<br />Authenticated. Timeless. Yours again.</p><div className="hero-actions"><Link className="button button-light" to="/shop?sort=newest">SHOP NEW ARRIVALS</Link><Link className="button button-outline-light" to="/sell">SELL YOUR ITEM</Link></div></div>
      </section>

      <section className="designer-strip" id="designers"><div className="designer-label"><span>SHOP BY</span><span>DESIGNER</span></div><div className="designer-links">{designers.slice(0, 9).map((designer) => <Link key={designer} to={`/designer/${slugify(designer)}`}>{designer}</Link>)}</div></section>

      <section className="section new-arrivals"><div className="section-head"><div><p className="eyebrow gold">JUST LANDED</p><h2>NEW ARRIVALS</h2></div><Link className="link-arrow" to="/shop?sort=newest">View all <ArrowRight size={18} /></Link></div><ProductGrid products={products.filter((product) => product.newArrival).slice(0, 4)} /></section>

      <section className="section clothing-edit"><div className="section-head"><div><p className="eyebrow gold">PRE-OWNED READY-TO-WEAR</p><h2>THE CLOTHING EDIT</h2></div><Link className="link-arrow" to="/categories/clothing">Shop clothing <ArrowRight size={18} /></Link></div><ProductGrid products={products.filter((product) => product.category === "clothing").slice(0, 8)} /></section>

      <section className="trust-band">
        <div><ShieldCheck size={26} weight="thin" /><span><strong>MODEX VERIFIED</strong>Every piece independently inspected.</span></div>
        <div><Truck size={26} weight="thin" /><span><strong>WORLDWIDE DELIVERY</strong>Tracked delivery from the UAE.</span></div>
        <div><CreditCard size={26} weight="thin" /><span><strong>SECURE PAYMENT</strong>Protected checkout and support.</span></div>
      </section>

      <AuthenticationSection />

      <section className="sell-callout"><div><p className="eyebrow gold">A CONSIDERED SECOND LIFE</p><h2>SELL YOUR<br />LUXURY PIECES</h2></div><div><p>Share a few details with our specialists. We’ll review your item, arrange authentication and provide a considered evaluation.</p><Link className="button button-outline-light" to="/sell">START YOUR SUBMISSION</Link></div></section>
    </>
  );
}
