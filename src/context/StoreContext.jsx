import { createContext, useContext, useEffect, useMemo, useState } from "react";

const StoreContext = createContext(null);

function load(key, fallback) {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load("modex-cart", []));
  const [wishlist, setWishlist] = useState(() => load("modex-wishlist", []));
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountLoggedIn, setAccountLoggedIn] = useState(() => load("modex-account", false));

  useEffect(() => window.localStorage.setItem("modex-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => window.localStorage.setItem("modex-wishlist", JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => window.localStorage.setItem("modex-account", JSON.stringify(accountLoggedIn)), [accountLoggedIn]);

  const addToCart = (id, open = true) => {
    setCart((items) => items.some((item) => item.id === id)
      ? items.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item)
      : [...items, { id, qty: 1 }]);
    if (open) setCartOpen(true);
  };
  const updateQty = (id, qty) => setCart((items) => qty < 1 ? items.filter((item) => item.id !== id) : items.map((item) => item.id === id ? { ...item, qty } : item));
  const removeFromCart = (id) => setCart((items) => items.filter((item) => item.id !== id));
  const toggleWishlist = (id) => setWishlist((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);

  const value = useMemo(() => ({
    cart, wishlist, searchOpen, cartOpen, mobileOpen, accountLoggedIn,
    setSearchOpen, setCartOpen, setMobileOpen, setAccountLoggedIn,
    addToCart, updateQty, removeFromCart, toggleWishlist,
    cartCount: cart.reduce((sum, item) => sum + item.qty, 0),
  }), [cart, wishlist, searchOpen, cartOpen, mobileOpen, accountLoggedIn]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
