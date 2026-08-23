import { Check, SlidersHorizontal, X } from "@phosphor-icons/react";
import { designers } from "../data/products.js";

const sections = [
  ["Brand", designers],
  ["Category", ["bags", "shoes", "watches", "accessories"]],
  ["Condition", ["Pristine", "Excellent", "Very Good", "Good"]],
  ["Colour", ["Black", "Burgundy", "Taupe", "Silver", "Gold"]],
  ["Material", ["Leather", "Stainless steel", "Satin", "Gold"]],
  ["Availability", ["In stock"]],
];

export function FilterSidebar({ filters, setFilters, mobile = false, open = false, onClose }) {
  const toggle = (key, value) => setFilters((current) => ({ ...current, [key]: current[key]?.includes(value) ? current[key].filter((item) => item !== value) : [...(current[key] || []), value] }));
  const clear = () => setFilters({ Brand: [], Category: [], Condition: [], Colour: [], Material: [], Availability: [] });
  return (
    <aside className={`${mobile ? "mobile-filter" : "filter-sidebar"} ${open ? "open" : ""}`} aria-hidden={mobile && !open}>
      {mobile && <div className="drawer-head"><h2><SlidersHorizontal size={20} /> Filters</h2><button className="icon-button" onClick={onClose} aria-label="Close filters"><X size={24} /></button></div>}
      <div className="filter-scroll">
        <div className="filter-title"><span>FILTER</span><button onClick={clear}>Clear all</button></div>
        {sections.map(([label, values]) => (
          <details key={label} open={label === "Brand" || label === "Condition"}>
            <summary>{label}<span>+</span></summary>
            <div className="filter-options">
              {values.map((value) => {
                const active = filters[label]?.includes(value);
                return <label key={value}><input type="checkbox" checked={active || false} onChange={() => toggle(label, value)} /><span className="check-box">{active && <Check size={12} weight="bold" />}</span>{value}</label>;
              })}
            </div>
          </details>
        ))}
        <details>
          <summary>Price <span>+</span></summary>
          <div className="price-filter"><label>Min<input type="number" min="0" value={filters.minPrice || ""} onChange={(event) => setFilters((current) => ({ ...current, minPrice: event.target.value }))} placeholder="AED 0" /></label><label>Max<input type="number" min="0" value={filters.maxPrice || ""} onChange={(event) => setFilters((current) => ({ ...current, maxPrice: event.target.value }))} placeholder="AED 75,000" /></label></div>
        </details>
      </div>
      {mobile && <div className="mobile-filter-actions"><button className="button button-dark button-block" onClick={onClose}>VIEW RESULTS</button></div>}
    </aside>
  );
}
