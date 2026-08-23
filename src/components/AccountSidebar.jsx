import { AddressBook, Handbag, Heart, Package, SignOut, UserCircle, Wallet } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

const links = [
  ["Overview", "/account", UserCircle], ["Orders", "/account/orders", Package], ["Wishlist", "/wishlist", Heart],
  ["Addresses", "/account/addresses", AddressBook], ["Profile", "/account/profile", UserCircle], ["Sell Requests", "/account/selling", Handbag],
];

export function AccountSidebar() {
  const { setAccountLoggedIn } = useStore();
  return <aside className="account-sidebar"><p className="eyebrow">MY ACCOUNT</p>{links.map(([label, to, Icon]) => <NavLink key={label} to={to} end={to === "/account"}><Icon size={18} />{label}</NavLink>)}<button onClick={() => setAccountLoggedIn(false)}><SignOut size={18} />Logout</button><div className="account-credit"><Wallet size={18} /><span>MODEX Credit<strong>AED 0</strong></span></div></aside>;
}
