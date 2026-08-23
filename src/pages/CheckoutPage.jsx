import { Check, CreditCard, LockKey, Truck } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { products } from "../data/products.js";
import { formatAED, useDocumentMeta } from "../lib/format.js";

export function CheckoutPage() {
  useDocumentMeta("Checkout", "Secure MODEX checkout.");
  const { cart } = useStore();
  const [step, setStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const items = cart.map((item) => ({ ...item, product: products.find((product) => product.id === item.id) })).filter((item) => item.product);
  const total = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  if (complete) return <main className="checkout-complete"><span><Check size={28} /></span><p className="eyebrow">ORDER MX-{Date.now().toString().slice(-6)}</p><h1>Thank you for your order.</h1><p>Your piece is being prepared for a final quality check. A confirmation has been sent to your email.</p><Link className="button button-dark" to="/account/orders">VIEW ORDER</Link></main>;
  return (
    <main className="checkout-page">
      <div className="checkout-head"><Link to="/" className="checkout-logo">MODEX</Link><span><LockKey size={16} /> SECURE CHECKOUT</span></div>
      <div className="checkout-steps">{[[1, "Information"], [2, "Delivery"], [3, "Payment"]].map(([number, label]) => <button key={number} className={step === number ? "active" : step > number ? "done" : ""} onClick={() => step > number && setStep(number)}><span>{step > number ? <Check size={13} /> : number}</span>{label}</button>)}</div>
      <div className="checkout-layout"><section className="checkout-form-area"><form onSubmit={(event) => { event.preventDefault(); if (step < 3) setStep(step + 1); else setComplete(true); }}>
        {step === 1 && <><div className="checkout-section-head"><p className="eyebrow">STEP 1 OF 3</p><h1>Your information</h1></div><div className="form-grid"><label className="span-2">Email<input required type="email" autoComplete="email" /></label><label>First name<input required autoComplete="given-name" /></label><label>Last name<input required autoComplete="family-name" /></label><label className="span-2">Phone<input required type="tel" autoComplete="tel" /></label><label className="span-2">Country<select defaultValue="United Arab Emirates"><option>United Arab Emirates</option><option>Malaysia</option><option>Singapore</option><option>United Kingdom</option></select></label><label className="span-2">Address<input required autoComplete="street-address" /></label><label>City<input required autoComplete="address-level2" /></label><label>Postal code<input required autoComplete="postal-code" /></label></div></>}
        {step === 2 && <><div className="checkout-section-head"><p className="eyebrow">STEP 2 OF 3</p><h1>Delivery method</h1></div><label className="method-card selected"><input type="radio" defaultChecked name="delivery" /><Truck size={24} /><span><strong>MODEX Insured Delivery</strong>3–6 business days · Signature required</span><b>COMPLIMENTARY</b></label><label className="method-card"><input type="radio" name="delivery" /><Truck size={24} /><span><strong>Priority Delivery</strong>1–3 business days · Signature required</span><b>AED 180</b></label><div className="delivery-note"><strong>Delivery from Sharjah, UAE</strong><p>Tracking is shared once the piece completes its final quality-control check.</p></div></>}
        {step === 3 && <><div className="checkout-section-head"><p className="eyebrow">STEP 3 OF 3</p><h1>Payment</h1><p>This prototype does not process a real payment.</p></div><label className="method-card selected"><input type="radio" defaultChecked name="payment" /><CreditCard size={24} /><span><strong>Credit or debit card</strong>Visa, Mastercard, American Express</span></label><div className="form-grid card-fields"><label className="span-2">Card number<input required inputMode="numeric" placeholder="4242 4242 4242 4242" /></label><label>Expiry<input required placeholder="MM / YY" /></label><label>Security code<input required placeholder="CVC" /></label><label className="span-2">Name on card<input required /></label></div><label className="consent"><input type="checkbox" required /> I agree to the MODEX terms of sale and return policy.</label></>}
        <button className="button button-dark button-block checkout-next" type="submit">{step === 3 ? `PLACE ORDER · ${formatAED(total)}` : "CONTINUE"}</button>
      </form></section><aside className="checkout-summary"><h2>Order summary</h2>{items.length ? items.map(({ product, qty }) => <div className="checkout-item" key={product.id}><span><img src={product.images[0]} alt="" /><em>{qty}</em></span><p><strong>{product.brand}</strong>{product.name}<small>{product.condition}</small></p><b>{formatAED(product.price * qty)}</b></div>) : <p>Your bag is empty. <Link to="/shop">Return to shop.</Link></p>}<div className="checkout-totals"><div><span>Subtotal</span><span>{formatAED(total)}</span></div><div><span>Shipping</span><span>Complimentary</span></div><div><strong>Total</strong><strong>{formatAED(total)}</strong></div></div><p className="secure-note"><LockKey size={16} /> Your checkout is protected and encrypted.</p></aside></div>
    </main>
  );
}
