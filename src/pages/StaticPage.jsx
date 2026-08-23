import { Breadcrumb } from "../components/Breadcrumb.jsx";
import { useDocumentMeta } from "../lib/format.js";

const content = {
  shipping: ["Shipping", "Considered delivery, wherever you are.", "MODEX provides tracked, insured delivery from the United Arab Emirates. Estimated delivery windows are shown at checkout and may vary by destination and customs processing."],
  returns: ["Returns", "Time to consider your piece.", "Eligible purchases may be returned within 14 days of delivery, provided security tags remain attached and the piece is returned in its received condition."],
  contact: ["Contact", "Our client care team is here.", "For product questions, delivery support or selling enquiries, contact clientcare@modex.ae. We reply Sunday to Thursday, 9:00–18:00 UAE time."],
  faq: ["Frequently Asked Questions", "Clear answers, before and after purchase.", "Every item is independently inspected by MODEX. Product pages describe condition and included items. Delivery is tracked, and eligible returns are accepted within the stated return window."],
  terms: ["Terms", "Terms of sale.", "These prototype terms describe the intended purchase flow only. A production launch should include legal review covering payment, delivery, returns, customs, privacy and consumer protection."],
  privacy: ["Privacy", "Your information, handled with care.", "This prototype stores cart, wishlist and demo account state in your browser. It does not transmit or process payment credentials."],
};

export function StaticPage({ type }) {
  const [title, heading, copy] = content[type];
  useDocumentMeta(title, copy);
  return <main className="text-page page-shell"><Breadcrumb items={[{ label: title }]} /><div className="text-page-grid"><div><p className="eyebrow">CUSTOMER CARE</p><h1>{title}</h1></div><article><h2>{heading}</h2><p>{copy}</p>{type === "faq" && <><h3>How are pieces authenticated?</h3><p>Our specialists examine construction, materials, hardware, codes and available provenance before final quality control.</p><h3>Do you ship internationally?</h3><p>Yes. Available delivery services and estimated duties are shown during checkout.</p><h3>Can I sell to MODEX?</h3><p>Yes. Submit details and photographs through Sell With Us for an initial evaluation.</p></>}</article></div></main>;
}
