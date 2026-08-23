import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { assetUrl } from "../lib/format.js";
import { VerifiedBadge } from "./Brand.jsx";

const steps = [
  ["01", "Expert Inspection", "Every surface, seam and moving part is examined."],
  ["02", "Material & Craftsmanship Review", "Construction and finishing are assessed against house standards."],
  ["03", "Serial / Reference Verification", "Codes, stamps and provenance details are carefully reviewed."],
  ["04", "Final Quality Control", "Condition is documented before the piece is approved."],
];

export function AuthenticationSection({ compact = false }) {
  return (
    <section className={`auth-section ${compact ? "compact" : ""}`}>
      <div className="auth-image"><img src={assetUrl("authentication.webp")} alt="MODEX specialist inspecting leather craftsmanship" /><div className="auth-image-label"><VerifiedBadge /><span>Independent inspection, documented by MODEX.</span></div></div>
      <div className="auth-copy"><p className="eyebrow gold">MODEX AUTHENTICATION</p><h2>AUTHENTICITY,<br />WITHOUT COMPROMISE.</h2><div className="auth-steps">{steps.map(([number, title, copy]) => <div key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div><Link className="link-arrow" to="/authentication">Discover our standards <ArrowRight size={17} /></Link></div>
    </section>
  );
}
