import { FacebookLogo, InstagramLogo, PinterestLogo, TiktokLogo } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Brand } from "./Brand.jsx";
import { Newsletter } from "./Newsletter.jsx";

const groups = [
  ["Shop", [["New Arrivals", "/shop?sort=newest"], ["Women", "/categories/women"], ["Men", "/categories/men"], ["Bags", "/categories/bags"], ["Clothing", "/categories/clothing"], ["Watches", "/categories/watches"], ["Accessories", "/categories/accessories"]]],
  ["Services", [["Authentication", "/authentication"], ["Sell With Us", "/sell"], ["Shipping", "/shipping"], ["Returns", "/returns"]]],
  ["Customer Care", [["Contact", "/contact"], ["FAQ", "/faq"], ["Terms", "/terms"], ["Privacy", "/privacy"]]],
  ["Company", [["About MODEX", "/about"], ["Modex Fashion Trading FZE", "/about"]]],
];

export function Footer() {
  return (
    <>
      <Newsletter />
      <footer className="site-footer">
        <div className="footer-top"><div className="footer-brand"><Brand light /><p>Second-hand luxury trading platform.</p><address className="footer-company-details"><strong>Modex Fashion Trading FZE</strong><span>Business Centre,<br />Sharjah Publishing City Free Zone,<br />Sharjah, United Arab Emirates</span><span>Business License No. 4420464.01</span></address><div className="socials"><a href="#instagram" aria-label="Instagram"><InstagramLogo size={20} /></a><a href="#tiktok" aria-label="TikTok"><TiktokLogo size={20} /></a><a href="#facebook" aria-label="Facebook"><FacebookLogo size={20} /></a><a href="#pinterest" aria-label="Pinterest"><PinterestLogo size={20} /></a></div></div>
          {groups.map(([title, links]) => <div className="footer-group" key={title}><p>{title}</p>{links.map(([label, to]) => <Link key={label} to={to}>{label}</Link>)}</div>)}
        </div>
        <div className="footer-bottom"><span>© 2026 MODEX</span><p>MODEX is an independent second-hand luxury trading platform. All trademarks and abbreviated brand references belong to their respective owners; MODEX is not affiliated with them unless expressly stated.</p><span>UAE · AED</span></div>
      </footer>
    </>
  );
}
