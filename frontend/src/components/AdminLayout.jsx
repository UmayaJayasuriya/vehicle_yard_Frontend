import { Outlet, NavLink } from "react-router-dom";
import "./AdminLayout.css";

const NAV = [
  { to: "/admin/vehicles", icon: "bi-car-front",   label: "Manage Vehicles" },
  { to: "/admin/finance",  icon: "bi-bar-chart",    label: "Finance Reports" },
  { to: "/admin/sold",     icon: "bi-check2-circle",label: "Sold Vehicles" },
];

export default function AdminLayout() {
  return (
    <div className="al page-content">
      <aside className="al__sidebar">
        <div className="al__sidebar-head">
          <span className="section-overline" style={{ margin: 0 }}>Administration</span>
        </div>
        <nav className="al__nav">
          {NAV.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `al__link${isActive ? " is-active" : ""}`}
            >
              <i className={`bi ${icon} al__link-icon`} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="al__main">
        <Outlet />
      </main>
    </div>
  );
}
