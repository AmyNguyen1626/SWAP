import "./ListingCard.css";

export default function ListingCard({ image, name, condition, location }) {
  return (
    <div className="listing-card">
      <img src={image} alt={name} className="listing-image" />
      <div className="listing-info">
        <h3 className="listing-name">{name}</h3>
        <p className="listing-condition">{condition}</p>
        <p className="listing-location">{location}</p>
      </div>
    </div>
  );
}