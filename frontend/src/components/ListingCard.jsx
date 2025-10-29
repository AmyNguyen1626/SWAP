import { useNavigate } from "react-router-dom";
import "./ListingCard.css";

export default function ListingCard({ id, image, name, condition, location, price }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listing/${id}`);
  };

  return (
    <div className="listing-card" onClick={handleClick}>
      <img src={image} alt={name} className="listing-image" />
      <div className="listing-info">
        <h3 className="listing-name">{name}</h3>
        <p className="listing-location">{location}</p>
        <p className="listing-location">${Number(price).toLocaleString()}</p>
      </div>
    </div>
  );
}