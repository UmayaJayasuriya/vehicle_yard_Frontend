import { Link } from "react-router-dom";
import "./VehicleCard.css";

export default function VehicleCard({ vehicle }) {
  return (
    <div className="vc">
      <div className="vc__img-wrap">
        <img
          src={vehicle.coverImage}
          alt={vehicle.title}
          className="vc__img"
          loading="lazy"
        />
        {vehicle.details?.location && (
          <span className="vc__loc">
            <i className="bi bi-geo-alt-fill" /> {vehicle.details.location}
          </span>
        )}
      </div>
      <div className="vc__body">
        <h3 className="vc__title">{vehicle.title}</h3>
        <p className="vc__desc">{vehicle.shortDesc}</p>
        <div className="vc__footer">
          <div>
            <div className="vc__price-label">ASKING PRICE</div>
            <div className="vc__price">Rs. {Number(vehicle.price).toLocaleString()}</div>
          </div>
          <Link className="vc__cta" to={`/vehicle/${vehicle.id}`}>
            View Details <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
}
