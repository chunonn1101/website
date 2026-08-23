import { SlidersHorizontal, SortAscending, X } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Breadcrumb } from "../components/Breadcrumb.jsx";
import { FilterSidebar } from "../components/FilterSidebar.jsx";
import { ProductGrid } from "../components/ProductGrid.jsx";
import { designers, products } from "../data/products.js";
import { slugify, useDocumentMeta } from "../lib/format.js";

const initialFilters = { Brand: [], Category: [], Condition: [], Colour: [], Material: [], Availability: [] };

export function ShopPage({ mode = "shop" }) {
  const params = useParams();
  const location = useLocation();
  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState(new URLSearchParams(location.search).get("sort") || "recommended");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const routeValue = params.category || params.designer;
  const designerName = mode === "designer" ? designers.find((designer) => slugify(designer) === routeValue) : null;
  const title = designerName || (routeValue ? routeValue.replace(/-/g, " ") : "Shop all");
  useDocumentMeta(`${title.replace(/\b\w/g, (c) => c.toUpperCase())} — Pre-Owned Luxury`, `Shop authenticated pre-owned ${title} at MODEX.`);

  const visible = useMemo(() => {
    let result = [...products];
    if (mode === "designer" && designerName) result = result.filter((product) => product.brand === designerName);
    if (mode === "category" && routeValue) result = ["women", "men"].includes(routeValue) ? result.filter((product) => product.gender === routeValue) : result.filter((product) => product.category === routeValue);
    for (const key of ["Brand", "Category", "Condition", "Colour", "Material"]) {
      if (filters[key]?.length) {
        const field = key.toLowerCase();
        result = result.filter((product) => filters[key].some((value) => String(product[field]).toLowerCase().includes(String(value).toLowerCase())));
      }
    }
    if (filters.minPrice) result = result.filter((product) => product.price >= Number(filters.minPrice));
    if (filters.maxPrice) result = result.filter((product) => product.price <= Number(filters.maxPrice));
    if (sort === "newest") result.sort((a, b) => Number(b.newArrival) - Number(a.newArrival) || b.year - a.year);
    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "recommended") result.sort((a, b) => Number(b.featured) - Number(a.featured));
    return result;
  }, [mode, designerName, routeValue, filters, sort]);

  const activeFilterCount = Object.values(filters).reduce((sum, value) => sum + (Array.isArray(value) ? value.length : value ? 1 : 0), 0);
  return (
    <main className="listing-page">
      <div className="page-shell"><Breadcrumb items={[{ label: mode === "shop" ? "Shop" : title }]} /><div className="listing-heading"><div><p className="eyebrow">CURATED SELECTION</p><h1>{title}</h1></div><p>{visible.length} pieces</p></div>
        <div className="listing-toolbar"><button className="mobile-filter-trigger" onClick={() => setMobileFilterOpen(true)}><SlidersHorizontal size={18} /> FILTER {activeFilterCount ? `(${activeFilterCount})` : ""}</button><label><SortAscending size={18} /><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">Recommended</option><option value="newest">Newest</option><option value="low">Price Low to High</option><option value="high">Price High to Low</option></select></label></div>
        <div className="listing-layout"><FilterSidebar filters={filters} setFilters={setFilters} /><div className="listing-results">{visible.length ? <ProductGrid products={visible} /> : <div className="no-results"><X size={28} /><h2>No pieces match your selection.</h2><p>Try clearing a filter to see more of the collection.</p><button className="text-button" onClick={() => setFilters(initialFilters)}>Clear all filters</button></div>}</div></div>
      </div>
      <button className={`drawer-backdrop ${mobileFilterOpen ? "open" : ""}`} onClick={() => setMobileFilterOpen(false)} aria-label="Close filters" />
      <FilterSidebar mobile open={mobileFilterOpen} filters={filters} setFilters={setFilters} onClose={() => setMobileFilterOpen(false)} />
    </main>
  );
}
