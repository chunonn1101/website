import { CaretRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          <CaretRight size={12} aria-hidden="true" />
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
