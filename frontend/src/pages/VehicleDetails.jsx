import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ImageGallery from "../components/ImageGallery";
import api from "../api/client";
import "./VehicleDetails.css";

const SPEC_ROWS = [
  { label: "Brand",           key: "brand" },
  { label: "Model",           key: "model" },
  { label: "Year",            key: "year" },
  { label: "Fuel",            key: "fuel" },
  { label: "Transmission",   key: "transmission" },
  { label: "Location",       key: "location" },
  { label: "Color",          key: "color" },
  { label: "Chassis No",     key: "chassisNo" },
  { label: "Engine No",      key: "engineNo" },
  { label: "Registration",   key: "registrationNo" },
];

export default function VehicleDetails() {
  const { id } = useParams();
  const [vehicles, setVehicles] = useState([]);
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

  const vehicle = useMemo(() => vehicles.find(v => v.id === id), [vehicles, id]);

  if (loading) return (
    <div className="page-content">
      <div className="vd-skeleton-wrap">
        <div className="vd-skeleton" style={{ height: 340 }} />
        <div style={{ flex: 1 }}>
          <div className="vd-skeleton" style={{ height: 40, marginBottom: 12 }} />
          <div className="vd-skeleton" style={{ height: 24, width: "60%", marginBottom: 8 }} />
          <div className="vd-skeleton" style={{ height: 200 }} />
        </div>
      </div>
    </div>
  );

  if (!vehicle) return (
    <div className="page-content vd-not-found">
      <div className="home-empty__icon">🔍</div>
      <h2>Vehicle not found</h2>
      <p>This listing may have been removed or does not exist.</p>
      <Link to="/" className="btn-primary" style={{ display: "inline-block", marginTop: "1rem" }}>← Back to Listings</Link>
    </div>
  );

  return (
    <div className="page-content fade-in">
      {/* Breadcrumb */}
      <div className="vd-breadcrumb">
        <Link to="/" className="vd-breadcrumb__link">Vehicles</Link>
        <span className="vd-breadcrumb__sep">›</span>
        <span className="vd-breadcrumb__current">{vehicle.title}</span>
      </div>

      <div className="vd-layout">
        {/* Gallery */}
        <div className="vd-gallery">
          <ImageGallery images={vehicle.images} height={360} />
        </div>

        {/* Info */}
        <div className="vd-info">
          <div className="vd-info__header">
            <h1 className="vd-info__title">{vehicle.title}</h1>
            {vehicle.details?.location && (
              <span className="badge-pill">{vehicle.details.location}</span>
            )}
          </div>

          <div className="vd-info__price">
            <span className="vd-info__price-label">Price</span>
            <span className="vd-info__price-val">Rs. {Number(vehicle.price).toLocaleString()}</span>
          </div>

          {vehicle.shortDesc && (
            <p className="vd-info__desc">{vehicle.shortDesc}</p>
          )}

          {/* Specs */}
          <div className="vd-specs">
            <h3 className="vd-specs__title">Specifications</h3>
            <div className="vd-specs__grid">
              {SPEC_ROWS.map(({ label, key }) => {
                const val = key === "mileageKm"
                  ? vehicle.details?.mileageKm != null
                    ? `${Number(vehicle.details.mileageKm).toLocaleString()} km`
                    : null
                  : vehicle.details?.[key];
                if (!val) return null;
                return (
                  <div key={key} className="vd-spec-item">
                    <span className="vd-spec-item__label">{label}</span>
                    <span className="vd-spec-item__val">{val}</span>
                  </div>
                );
              })}
              {vehicle.details?.mileageKm != null && (
                <div className="vd-spec-item">
                  <span className="vd-spec-item__label">Mileage</span>
                  <span className="vd-spec-item__val">{Number(vehicle.details.mileageKm).toLocaleString()} km</span>
                </div>
              )}
            </div>
          </div>

          <div className="vd-info__actions">
            <Link to="/" className="btn-outline">← Back to Listings</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
