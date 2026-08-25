import { Handbag, Heart, List, MagnifyingGlass, User, X } from "@phosphor-icons/react";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { Brand } from "./Brand.jsx";
import { SearchOverlay } from "./SearchOverlay.jsx";
import { CartDrawer } from "./CartDrawer.jsx";

const navItems = [
  ["NEW IN", "/shop?sort=newest"], ["WOMEN", "/categories/women"], ["MEN", "/categories/men"],
  ["BAGS", "/categories/bags"], ["CLOTHING", "/categories/clothing"], ["SHOES", "/categories/shoes"], ["WATCHES", "/categories/watches"],
  ["ACCESSORIES", "/categories/accessories"], ["DESIGNERS", "/shop#designers"], ["SELL WITH US", "/sell"],
];

export function Header() {
  const { cartCount, wishlist, setSearchOpen, setCartOpen, mobileOpen, setMobileOpen, searchOpen, cartOpen } = useStore();
  useEffect(() => {
    document.body.classList.toggle("no-scroll", mobileOpen || searchOpen || cartOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [mobileOpen, searchOpen, cartOpen]);

  return (
    <>
      <div className="announcement"><span>AUTHENTICATED SECOND-HAND LUXURY TRADING PLATFORM</span><span className="announcement-currency">UAE (AED)⌄</span></div>
      <header className="site-header">
        <button className="icon-button mobile-only" onClick={() => setMobileOpen(true)} aria-label="Open menu"><List size={24} /></button>
        <Brand light />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, to]) => <NavLink key={label} to={to}>{label}</NavLink>)}
        </nav>
        <div className="header-actions">
          <button className="icon-button" onClick={() => setSearchOpen(true)} aria-label="Search"><MagnifyingGlass size={21} /></button>
          <Link className="icon-button desktop-action" to="/wishlist" aria-label={`Wishlist with ${wishlist.length} items`}><Heart size={21} />{wishlist.length > 0 && <span className="count-badge">{wishlist.length}</span>}</Link>
          <Link className="icon-button desktop-action" to="/account" aria-label="Account"><User size={21} /></Link>
          <button className="icon-button" onClick={() => setCartOpen(true)} aria-label={`Shopping bag with ${cartCount} items`}><Handbag size={21} />{cartCount > 0 && <span className="count-badge">{cartCount}</span>}</button>
        </div>
      </header>
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-menu-head"><Brand /><button className="icon-button" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={26} /></button></div>
        <nav>{navItems.map(([label, to]) => <NavLink key={label} to={to} onClick={() => setMobileOpen(false)}>{label}<span>→</span></NavLink>)}</nav>
        <div className="mobile-menu-foot"><Link to="/wishlist" onClick={() => setMobileOpen(false)}>Wishlist ({wishlist.length})</Link><Link to="/account" onClick={() => setMobileOpen(false)}>Account</Link><Link to="/authentication" onClick={() => setMobileOpen(false)}>Our Authentication</Link></div>
      </div>
      <SearchOverlay />
      <CartDrawer />
    </>
  );
}
