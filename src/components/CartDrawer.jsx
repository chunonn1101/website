import { Minus, Plus, X } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { products } from "../data/products.js";
import { formatAED } from "../lib/format.js";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart } = useStore();
  const items = cart.map((item) => ({ ...item, product: products.find((product) => product.id === item.id) })).filter((item) => item.product);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  return (
    <>
      <button className={`drawer-backdrop ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} aria-label="Close shopping bag" tabIndex={cartOpen ? 0 : -1} />
      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen}>
        <div className="drawer-head"><h2>Your Bag <span>{items.length}</span></h2><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close"><X size={24} /></button></div>
        <div className="drawer-body">
          {items.length ? items.map(({ product, qty }) => (
            <article className="cart-drawer-item" key={product.id}>
              <img src={product.images[0]} alt="" />
              <div>
                <p className="eyebrow">{product.brand}</p><h3>{product.name}</h3><p>{product.condition} Condition</p><strong>{formatAED(product.price)}</strong>
                <div className="quantity-control"><button onClick={() => updateQty(product.id, qty - 1)} aria-label="Decrease quantity"><Minus size={14} /></button><span>{qty}</span><button onClick={() => updateQty(product.id, qty + 1)} aria-label="Increase quantity"><Plus size={14} /></button></div>
                <button className="text-button" onClick={() => removeFromCart(product.id)}>Remove</button>
              </div>
            </article>
          )) : <div className="empty-drawer"><p className="display-small">Your bag is empty.</p><Link className="link-arrow" to="/shop" onClick={() => setCartOpen(false)}>Discover new arrivals <span>→</span></Link></div>}
        </div>
        {items.length > 0 && <div className="drawer-footer"><div><span>Subtotal</span><strong>{formatAED(subtotal)}</strong></div><p>Shipping calculated at checkout.</p><Link className="button button-dark button-block" to="/checkout" onClick={() => setCartOpen(false)}>CHECKOUT</Link><Link className="text-link centered" to="/cart" onClick={() => setCartOpen(false)}>View shopping bag</Link></div>}
      </aside>
    </>
  );
}
