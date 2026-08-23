import { Breadcrumb } from "../components/Breadcrumb.jsx";
import { EmptyState } from "../components/EmptyState.jsx";
import { ProductGrid } from "../components/ProductGrid.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { products } from "../data/products.js";
import { useDocumentMeta } from "../lib/format.js";

export function WishlistPage() {
  useDocumentMeta("Wishlist", "Your saved MODEX pieces.");
  const { wishlist } = useStore();
  const saved = products.filter((product) => wishlist.includes(product.id));
  return <main className="standard-page page-shell"><Breadcrumb items={[{ label: "Wishlist" }]} /><div className="page-title"><p className="eyebrow">SAVED PIECES</p><h1>WISHLIST</h1><p>{saved.length} {saved.length === 1 ? "piece" : "pieces"}</p></div>{saved.length ? <ProductGrid products={saved} /> : <EmptyState title="Your wishlist is ready when you are." copy="Save the pieces you love and return to them here." />}</main>;
}
