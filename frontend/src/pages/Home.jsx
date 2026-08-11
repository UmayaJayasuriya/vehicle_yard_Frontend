import { useEffect, useMemo, useState } from "react";
import VehicleCard from "../components/VehicleCard";
import api from "../api/client";
import "./Home.css";

const LOCATIONS = ["Jaffna", "Kilinochchi", "Vavuniya", "Batticaloa"];

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [q, setQ] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
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

  const brands = useMemo(() => {
    const set = new Set(available.map(v => v.details?.brand).filter(Boolean));
    return Array.from(set).sort();
  }, [available]);

  const fuels = useMemo(() => {
    const set = new Set(available.map(v => v.details?.fuel).filter(Boolean));
    return Array.from(set).sort();
  }, [available]);

  const filtered = useMemo(() => {
    let r = available;
    if (selectedLocation) r = r.filter(v => v.details?.location === selectedLocation);
    if (selectedBrand) r = r.filter(v => v.details?.brand === selectedBrand);
    if (selectedFuel) r = r.filter(v => v.details?.fuel === selectedFuel);

    const min = minPrice.trim() === "" ? null : Number(minPrice);
    const max = maxPrice.trim() === "" ? null : Number(maxPrice);
    if (min !== null && !Number.isNaN(min)) r = r.filter(v => Number(v.price) >= min);
    if (max !== null && !Number.isNaN(max)) r = r.filter(v => Number(v.price) <= max);

    const q2 = q.trim().toLowerCase();
    if (q2) {
      r = r.filter(v =>
        (v.title || "").toLowerCase().includes(q2) ||
        (v.shortDesc || "").toLowerCase().includes(q2) ||
        (v.details?.brand || "").toLowerCase().includes(q2) ||
        (v.details?.model || "").toLowerCase().includes(q2)
      );
    }

    if (sortBy) {
      r = [...r].sort((a, b) => {
        if (sortBy === "price_asc") return Number(a.price) - Number(b.price);
        if (sortBy === "price_desc") return Number(b.price) - Number(a.price);
        if (sortBy === "year_desc") return (b.details?.year || 0) - (a.details?.year || 0);
        if (sortBy === "year_asc") return (a.details?.year || 0) - (b.details?.year || 0);
        return 0;
      });
    }

    return r;
  }, [available, q, selectedLocation, selectedBrand, selectedFuel, minPrice, maxPrice, sortBy]);

  const hasActiveFilters = q || selectedLocation || selectedBrand || selectedFuel || minPrice || maxPrice || sortBy;

  function clearFilters() {
    setQ("");
    setSelectedLocation("");
    setSelectedBrand("");
    setSelectedFuel("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("");
  }

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
            {hasActiveFilters && (
              <button className="btn-ghost-vy h-filter__clear" onClick={clearFilters}>
                <i className="bi bi-x" /> Clear
              </button>
            )}
          </div>
          <div className="h-filter__inputs">
            <div className="h-filter__field h-filter__field--sm">
              <i className="bi bi-tag h-filter__icon" />
              <select
                className="vy-input h-filter__input"
                value={selectedBrand}
                onChange={e => setSelectedBrand(e.target.value)}
              >
                <option value="">All Brands</option>
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="h-filter__field h-filter__field--sm">
              <i className="bi bi-fuel-pump h-filter__icon" />
              <select
                className="vy-input h-filter__input"
                value={selectedFuel}
                onChange={e => setSelectedFuel(e.target.value)}
              >
                <option value="">All Fuel Types</option>
                {fuels.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className="h-filter__field h-filter__field--sm">
              <input
                type="number"
                min="0"
                className="vy-input h-filter__input h-filter__input--plain"
                placeholder="Min price"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
              />
            </div>
            <div className="h-filter__field h-filter__field--sm">
              <input
                type="number"
                min="0"
                className="vy-input h-filter__input h-filter__input--plain"
                placeholder="Max price"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
              />
            </div>
            <div className="h-filter__field h-filter__field--sm">
              <i className="bi bi-sort-down h-filter__icon" />
              <select
                className="vy-input h-filter__input"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="">Sort by</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="year_desc">Year: Newest First</option>
                <option value="year_asc">Year: Oldest First</option>
              </select>
            </div>
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
            <p>Try adjusting your search criteria or clearing the filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
