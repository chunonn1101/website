import { Minus, Plus, Trash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "../components/Breadcrumb.jsx";
import { EmptyState } from "../components/EmptyState.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { products } from "../data/products.js";
import { formatAED, useDocumentMeta } from "../lib/format.js";

export function CartPage() {
  useDocumentMeta("Shopping Bag", "Review the pieces in your MODEX shopping bag.");
  const { cart, updateQty, removeFromCart } = useStore();
  const items = cart.map((item) => ({ ...item, product: products.find((product) => product.id === item.id) })).filter((item) => item.product);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  return <main className="standard-page page-shell"><Breadcrumb items={[{ label: "Shopping Bag" }]} /><div className="page-title"><p className="eyebrow">YOUR SELECTION</p><h1>SHOPPING BAG</h1><p>{items.length} {items.length === 1 ? "piece" : "pieces"}</p></div>{items.length ? <div className="cart-layout"><div className="cart-list">{items.map(({ product, qty }) => <article key={product.id}><Link to={`/product/${product.slug}`}><img src={product.images[0]} alt={`${product.brand} ${product.name}`} /></Link><div className="cart-line-copy"><p className="eyebrow">{product.brand}</p><h2><Link to={`/product/${product.slug}`}>{product.name}</Link></h2><p>{product.condition} Condition</p><p>{product.colour} · {product.material}</p><div className="quantity-control"><button onClick={() => updateQty(product.id, qty - 1)} aria-label="Decrease"><Minus size={14} /></button><span>{qty}</span><button onClick={() => updateQty(product.id, qty + 1)} aria-label="Increase"><Plus size={14} /></button></div></div><div className="cart-line-price"><strong>{formatAED(product.price * qty)}</strong><button onClick={() => removeFromCart(product.id)} aria-label="Remove item"><Trash size={18} /> Remove</button></div></article>)}</div><aside className="order-summary"><h2>Order Summary</h2><div><span>Subtotal</span><strong>{formatAED(subtotal)}</strong></div><div><span>Shipping</span><span>Complimentary</span></div><div className="summary-total"><span>Total</span><strong>{formatAED(subtotal)}</strong></div><p>Taxes and duties are calculated based on your delivery destination.</p><Link className="button button-dark button-block" to="/checkout">CHECKOUT</Link><Link className="text-link centered" to="/shop">Continue shopping</Link></aside></div> : <EmptyState title="Your bag is empty." copy="Discover newly arrived pieces, each authenticated by MODEX." />}</main>;
}
