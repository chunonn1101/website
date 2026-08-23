import { SealCheck } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function Brand({ light = false, compact = false }) {
  return (
    <Link className={`brand ${light ? "brand-light" : ""} ${compact ? "brand-compact" : ""}`} to="/" aria-label="MODEX home">
      MODEX
    </Link>
  );
}

export function VerifiedBadge({ compact = false }) {
  return <span className={`verified-badge ${compact ? "compact" : ""}`}><SealCheck size={compact ? 17 : 22} weight="thin" /> MODEX VERIFIED</span>;
}
