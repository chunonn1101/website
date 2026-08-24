import { Camera, Check, UploadSimple } from "@phosphor-icons/react";
import { useState } from "react";
import { Breadcrumb } from "../components/Breadcrumb.jsx";
import { useDocumentMeta } from "../lib/format.js";

const process = [["01", "Submit Your Item"], ["02", "Receive an Evaluation"], ["03", "Authentication"], ["04", "Get Paid"]];

export function SellPage() {
  useDocumentMeta("Sell With Us", "Submit a luxury piece for a considered MODEX evaluation.");
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState([]);
  return (
    <main className="sell-page">
      <div className="page-shell"><Breadcrumb items={[{ label: "Sell With Us" }]} /></div>
      <section className="sell-hero"><div><p className="eyebrow gold">SELL WITH MODEX</p><h1>SELL YOUR<br />LUXURY PIECES</h1><p>A considered route to the next life of your bag, watch, shoe or accessory.</p></div><div className="sell-process">{process.map(([number, label]) => <div key={number}><span>{number}</span><p>{label}</p></div>)}</div></section>
      <section className="sell-form-section page-shell"><div className="form-intro"><p className="eyebrow">ITEM SUBMISSION</p><h2>Tell us about your piece.</h2><p>Share accurate details and clear photographs. Our specialists will review your submission and reply by email.</p></div>
        {submitted ? <div className="form-success"><span><Check size={28} /></span><h2>Submission received.</h2><p>Your reference is MX-{Date.now().toString().slice(-6)}. A MODEX specialist will review the details and contact you within two business days.</p><button className="button button-outline" onClick={() => setSubmitted(false)}>SUBMIT ANOTHER PIECE</button></div> : (
          <form className="luxury-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <div className="form-section-title"><span>01</span><h3>Item details</h3></div>
            <div className="form-grid"><label>Brand<select required defaultValue=""><option value="" disabled>Select brand</option><option>Chan</option><option>Louis V</option><option>Herm</option><option>Gucc</option><option>Prad</option><option>Dio</option><option>Other</option></select></label><label>Category<select required defaultValue=""><option value="" disabled>Select category</option><option>Bag</option><option>Shoes</option><option>Watch</option><option>Accessory</option><option>Fashion</option></select></label><label className="span-2">Product name<input required placeholder="Style or model name" /></label><label>Purchase year<input type="number" min="1950" max="2026" placeholder="e.g. 2021" /></label><label>Condition<select required defaultValue=""><option value="" disabled>Select condition</option><option>Pristine</option><option>Excellent</option><option>Very Good</option><option>Good</option></select></label><label className="span-2">Expected price (AED)<input type="number" min="0" placeholder="Optional" /></label></div>
            <div className="form-section-title"><span>02</span><h3>Photographs</h3></div>
            <label className="upload-zone"><input type="file" accept="image/*" multiple onChange={(event) => setFiles([...event.target.files])} /><Camera size={30} weight="thin" /><strong>{files.length ? `${files.length} photo${files.length > 1 ? "s" : ""} selected` : "Upload clear photographs"}</strong><span>Front, back, interior, hardware and any signs of wear</span><em><UploadSimple size={16} /> CHOOSE FILES</em></label>
            <div className="form-section-title"><span>03</span><h3>Your details</h3></div>
            <div className="form-grid"><label>Name<input required autoComplete="name" /></label><label>Email<input required type="email" autoComplete="email" /></label><label>Phone<input required type="tel" autoComplete="tel" /></label><label>Country<select required defaultValue="United Arab Emirates"><option>United Arab Emirates</option><option>Malaysia</option><option>Singapore</option><option>United Kingdom</option><option>Other</option></select></label></div>
            <label className="consent"><input type="checkbox" required /> I confirm that I own this item and the information provided is accurate.</label><button className="button button-dark" type="submit">SUBMIT FOR EVALUATION</button>
          </form>
        )}
      </section>
    </main>
  );
}
