import { Fingerprint, MagnifyingGlass, SealCheck, ShieldCheck } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "../components/Breadcrumb.jsx";
import { VerifiedBadge } from "../components/Brand.jsx";
import { assetUrl, useDocumentMeta } from "../lib/format.js";

const steps = [
  ["01", MagnifyingGlass, "Expert Inspection", "We review proportions, construction, moving parts and the visible condition of every piece."],
  ["02", Fingerprint, "Material & Craftsmanship Review", "Leather grain, stitching, hardware, finishing and workmanship are assessed in context."],
  ["03", ShieldCheck, "Serial / Reference Verification", "Available date codes, serial references, stamps and provenance details are cross-checked."],
  ["04", SealCheck, "Final Quality Control", "Condition is documented and the piece is approved before it reaches the collection."],
];

export function AuthenticationPage() {
  useDocumentMeta("Authentication", "Discover the independent MODEX authentication and quality-control process.");
  return (
    <main className="editorial-page auth-page">
      <div className="page-shell"><Breadcrumb items={[{ label: "Authentication" }]} /></div>
      <section className="editorial-hero"><div><p className="eyebrow gold">OUR STANDARD</p><h1>AUTHENTICITY,<br />WITHOUT<br />COMPROMISE.</h1><p>Every piece is examined before it enters the MODEX collection. Our review is independent, documented and grounded in material knowledge.</p><VerifiedBadge /></div><img src={assetUrl("authentication.webp")} alt="MODEX specialist examining leather craftsmanship" /></section>
      <section className="auth-process page-shell"><div className="section-intro"><p className="eyebrow">THE MODEX PROCESS</p><h2>Four considered checks.<br />One clear standard.</h2></div><div className="process-grid">{steps.map(([number, Icon, title, copy]) => <article key={number}><span>{number}</span><Icon size={30} weight="thin" /><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
      <section className="verified-statement"><VerifiedBadge /><p>MODEX VERIFIED is our mark of independent inspection. It does not imply affiliation with, or authorization by, any third-party luxury brand.</p></section>
      <section className="center-cta"><h2>Shop with clarity.</h2><p>Explore pieces reviewed to the same MODEX standard.</p><Link className="button button-dark" to="/shop">DISCOVER THE COLLECTION</Link></section>
    </main>
  );
}
