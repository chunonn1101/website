import { FacebookLogo, InstagramLogo, PinterestLogo, TiktokLogo } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Brand } from "./Brand.jsx";
import { Newsletter } from "./Newsletter.jsx";

const groups = [
  ["Shop", [["New Arrivals", "/shop?sort=newest"], ["Women", "/categories/women"], ["Men", "/categories/men"], ["Bags", "/categories/bags"], ["Watches", "/categories/watches"], ["Accessories", "/categories/accessories"]]],
  ["Services", [["Authentication", "/authentication"], ["Sell With Us", "/sell"], ["Shipping", "/shipping"], ["Returns", "/returns"]]],
  ["Customer Care", [["Contact", "/contact"], ["FAQ", "/faq"], ["Terms", "/terms"], ["Privacy", "/privacy"]]],
  ["Company", [["About MODEX", "/about"], ["Modex Fashion Trading FZE", "/about"]]],
];

export function Footer() {
  return (
    <>
      <Newsletter />
      <footer className="site-footer">
        <div className="footer-top"><div className="footer-brand"><Brand light /><p>Curated pre-owned luxury.<br />Sharjah, United Arab Emirates.</p><div className="socials"><a href="#instagram" aria-label="Instagram"><InstagramLogo size={20} /></a><a href="#tiktok" aria-label="TikTok"><TiktokLogo size={20} /></a><a href="#facebook" aria-label="Facebook"><FacebookLogo size={20} /></a><a href="#pinterest" aria-label="Pinterest"><PinterestLogo size={20} /></a></div></div>
          {groups.map(([title, links]) => <div className="footer-group" key={title}><p>{title}</p>{links.map(([label, to]) => <Link key={label} to={to}>{label}</Link>)}</div>)}
        </div>
        <div className="footer-bottom"><span>© 2026 MODEX</span><p>All trademarks and brand names belong to their respective owners. MODEX is an independent pre-owned luxury retailer and is not affiliated with the brands displayed unless expressly stated.</p><span>UAE · AED</span></div>
      </footer>
    </>
  );
}
