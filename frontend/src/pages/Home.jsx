import { useEffect, useMemo, useState } from "react";
import VehicleCard from "../components/VehicleCard";
import api from "../api/client";
import "./Home.css";

const LOCATIONS = ["Jaffna", "Kilinochchi", "Vavuniya", "Batticaloa"];

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [q, setQ] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api.getVehicles();
        if (mounted) setVehicles(data);
      } catch (e) { console.error(e); }
      finally { if (mounted) setLoading(false); }
    })();
    return () => { mounted = false; };
  }, []);

  const available = useMemo(() => vehicles.filter(v => v.status === "available"), [vehicles]);

  const filtered = useMemo(() => {
    let r = available;
    if (selectedLocation) r = r.filter(v => v.details?.location === selectedLocation);
    const q2 = q.trim().toLowerCase();
    if (!q2) return r;
    return r.filter(v =>
      (v.title || "").toLowerCase().includes(q2) ||
      (v.shortDesc || "").toLowerCase().includes(q2) ||
      (v.details?.brand || "").toLowerCase().includes(q2) ||
      (v.details?.model || "").toLowerCase().includes(q2)
    );
  }, [available, q, selectedLocation]);

  return (
    <div>
      {/* Hero */}
      <section className="h-hero">
        <div className="h-hero__wrap">
          <span className="section-overline">Sri Lanka's Trusted Marketplace</span>
          <h1 className="h-hero__h1">
            Discover Your Next<br />
            <span className="gradient-text">Vehicle</span>
          </h1>
          <p className="h-hero__sub">
            Browse a curated selection of quality cars and vehicles. Transparent pricing, verified listings, and professional service across 4 locations.
          </p>
          <div className="h-hero__kpis">
            <div className="h-kpi">
              <div className="h-kpi__val">{loading ? "—" : available.length}</div>
              <div className="h-kpi__lbl">Available</div>
            </div>
            <div className="h-kpi-div" />
            <div className="h-kpi">
              <div className="h-kpi__val">500+</div>
              <div className="h-kpi__lbl">Vehicles Sold</div>
            </div>
            <div className="h-kpi-div" />
            <div className="h-kpi">
              <div className="h-kpi__val">4</div>
              <div className="h-kpi__lbl">Locations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="page-content">
        {/* Filter bar */}
        <div className="h-filter">
          <div className="h-filter__inputs">
            <div className="h-filter__field">
              <i className="bi bi-search h-filter__icon" />
              <input
                className="vy-input h-filter__input"
                placeholder="Search by name, brand, or model..."
                value={q}
                onChange={e => setQ(e.target.value)}
              />
            </div>
            <div className="h-filter__field h-filter__field--sm">
              <i className="bi bi-geo-alt h-filter__icon" />
              <select
                className="vy-input h-filter__input"
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            {(q || selectedLocation) && (
              <button className="btn-ghost-vy h-filter__clear" onClick={() => { setQ(""); setSelectedLocation(""); }}>
                <i className="bi bi-x" /> Clear
              </button>
            )}
          </div>
          <p className="h-filter__count">
            {loading ? "Loading listings..." : `${filtered.length} listing${filtered.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="h-grid">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-skel" />)}
          </div>
        ) : filtered.length ? (
          <div className="h-grid">
            {filtered.map((v, i) => (
              <div key={v.id} style={{ animationDelay: `${Math.min(i * 0.04, 0.4)}s` }}>
                <VehicleCard vehicle={v} />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-empty">
            <i className="bi bi-search h-empty__icon" />
            <h3>No results found</h3>
            <p>Try adjusting your search criteria or clearing the location filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
