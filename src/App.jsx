import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { StoreProvider } from "./context/StoreContext.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { AccountPage } from "./pages/AccountPage.jsx";
import { AuthenticationPage } from "./pages/AuthenticationPage.jsx";
import { CartPage } from "./pages/CartPage.jsx";
import { CheckoutPage } from "./pages/CheckoutPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ProductPage } from "./pages/ProductPage.jsx";
import { SellPage } from "./pages/SellPage.jsx";
import { ShopPage } from "./pages/ShopPage.jsx";
import { StaticPage } from "./pages/StaticPage.jsx";
import { WishlistPage } from "./pages/WishlistPage.jsx";

function AppShell() {
  const location = useLocation();
  const isCheckout = location.pathname === "/checkout";
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [location.pathname]);
  return (
    <div className="app-shell">
      {!isCheckout && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/categories/:category" element={<ShopPage mode="category" />} />
        <Route path="/designer/:designer" element={<ShopPage mode="designer" />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/authentication" element={<AuthenticationPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/orders" element={<AccountPage />} />
        <Route path="/account/profile" element={<AccountPage />} />
        <Route path="/account/addresses" element={<AccountPage />} />
        <Route path="/account/selling" element={<AccountPage />} />
        <Route path="/about" element={<AboutPage />} />
        {['shipping', 'returns', 'contact', 'faq', 'terms', 'privacy'].map((type) => <Route key={type} path={`/${type}`} element={<StaticPage type={type} />} />)}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isCheckout && <Footer />}
    </div>
  );
}

export function App() {
  const basename = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL.replace(/\/$/, "");
  return <BrowserRouter basename={basename}><StoreProvider><AppShell /></StoreProvider></BrowserRouter>;
}
