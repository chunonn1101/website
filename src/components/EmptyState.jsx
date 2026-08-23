import { Link } from "react-router-dom";

export function EmptyState({ title, copy, action = "EXPLORE NEW ARRIVALS", to = "/shop" }) {
  return <div className="empty-state"><h2>{title}</h2><p>{copy}</p><Link className="button button-dark" to={to}>{action}</Link></div>;
}
