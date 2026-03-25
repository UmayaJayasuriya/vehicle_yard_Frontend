import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/authContext.jsx";
import "./Navbar.css";

export default function SiteNavbar() {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleLogout = () => { logout(); setMenuOpen(false); navigate("/"); };
  const close = () => setMenuOpen(false);
  const linkClass = ({ isActive }) => `vy-nav__link${isActive ? " is-active" : ""}`;

  return (
    <nav ref={navRef} className={`vy-nav${scrolled ? " vy-nav--raised" : ""}`}>
      <div className="vy-nav__inner">

        {/* Brand */}
        <Link className="vy-nav__brand" to="/" onClick={close}>
          <span className="vy-nav__brand-mark">VY</span>
          <span className="vy-nav__brand-name">Vehicle Yard</span>
        </Link>

        {/* Desktop links */}
        <div className="vy-nav__links">
          <NavLink className={linkClass} to="/" end>Vehicles</NavLink>
          <NavLink className={linkClass} to="/about">About</NavLink>
          <NavLink className={linkClass} to="/contact">Contact</NavLink>
          {isAdmin && (
            <>
              <NavLink className={linkClass} to="/admin/vehicles">Manage</NavLink>
              <NavLink className={linkClass} to="/admin/finance">Finance</NavLink>
              <NavLink className={linkClass} to="/admin/sold">Sold</NavLink>
            </>
          )}
        </div>

        {/* Desktop action */}
        <div className="vy-nav__action">
          {isAdmin ? (
            <button className="btn-ghost-vy" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right" /> Sign Out
            </button>
          ) : (
            <Link className="btn-primary-vy" to="/login">
              <i className="bi bi-person-lock" /> Admin
            </Link>
          )}
        </div>

        {/* Burger */}
        <button
          aria-label="Menu"
          className={`vy-nav__burger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`vy-nav__mobile${menuOpen ? " open" : ""}`}>
        <NavLink className="vy-nav__ml" to="/" end onClick={close}>Vehicles</NavLink>
        <NavLink className="vy-nav__ml" to="/about" onClick={close}>About</NavLink>
        <NavLink className="vy-nav__ml" to="/contact" onClick={close}>Contact</NavLink>
        {isAdmin && (
          <>
            <NavLink className="vy-nav__ml" to="/admin/vehicles" onClick={close}>Manage</NavLink>
            <NavLink className="vy-nav__ml" to="/admin/finance" onClick={close}>Finance</NavLink>
            <NavLink className="vy-nav__ml" to="/admin/sold" onClick={close}>Sold Vehicles</NavLink>
          </>
        )}
        {isAdmin
          ? <button className="vy-nav__ml" onClick={handleLogout} style={{ background: "none", border: "none", textAlign: "left", width: "100%", font: "inherit", cursor: "pointer" }}>Sign Out</button>
          : <NavLink className="vy-nav__ml" to="/login" onClick={close}>Admin</NavLink>
        }
      </div>
    </nav>
  );
}
