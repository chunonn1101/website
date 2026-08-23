export const formatAED = (value) => `AED ${new Intl.NumberFormat("en-AE").format(value)}`;
export const assetUrl = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

export function slugify(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function useDocumentMeta(title, description) {
  if (typeof document === "undefined") return;
  document.title = title ? `${title} | MODEX` : "MODEX | Authenticated Pre-Owned Luxury";
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = "description";
    document.head.appendChild(tag);
  }
  tag.content = description || "Curated and authenticated pre-owned luxury from MODEX.";
}
