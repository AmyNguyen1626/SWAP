import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ListingDetail.css";

export default function ListingDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        async function fetchListing() {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/api/listings/${id}`);
                
                if (!response.ok) {
                    throw new Error("Listing not found");
                }
                
                const data = await response.json();
                setListing(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchListing();
    }, [id]);

    if (loading) {
        return (
            <div className="listing-detail-container loading">
                <p>Loading listing...</p>
            </div>
        );
    }

    if (error || !listing) {
        return (
            <div className="listing-detail-container error">
                <h2>Listing Not Found</h2>
                <p>{error || "This listing doesn't exist or has been removed."}</p>
                <button onClick={() => navigate("/browse")}>Back to Browse</button>
            </div>
        );
    }

    const { category } = listing;
    const mainTitle = `${category.year} ${category.make} ${category.model}`;
    const specs = [
        category.badge,
        category.transmission,
        category.driveType,
        category.bodyType,
    ].filter(Boolean).join(" • ");

    return (
        <div className="listing-detail-container">
            {/* Back Button */}
            <button className="back-button" onClick={() => navigate("/browse")}>
                ← Back to Browse
            </button>

            {/* Main Content */}
            <div className="listing-detail-content">
                
                {/* Left Column - Images */}
                <div className="listing-images-section">
                    {/* Main Image */}
                    <div className="main-image-container">
                        <img 
                            src={listing.images[selectedImageIndex]} 
                            alt={`${listing.listingName} - Image ${selectedImageIndex + 1}`}
                            className="main-image"
                        />
                    </div>

                    {/* Thumbnail Gallery */}
                    {listing.images.length > 1 && (
                        <div className="thumbnail-gallery">
                            {listing.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                                    onClick={() => setSelectedImageIndex(index)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column - Details */}
                <div className="listing-info-section">
                    {/* Title */}
                    <div className="listing-header">
                        <h1 className="listing-title">{mainTitle}</h1>
                        <p className="listing-specs">{specs}</p>
                        <p className="listing-price">${Number(listing.price).toLocaleString()}</p>
                    </div>

                    {/* Key Specs Grid */}
                    <div className="specs-grid">
                        <div className="spec-item">
                            <span className="spec-label">Odometer</span>
                            <span className="spec-value">{Number(category.odometer).toLocaleString()} km</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Body Type</span>
                            <span className="spec-value">{category.bodyType}</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Transmission</span>
                            <span className="spec-value">{category.transmission}</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Drive Type</span>
                            <span className="spec-value">{category.driveType}</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Fuel Type</span>
                            <span className="spec-value">{category.fuelType}</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Engine</span>
                            <span className="spec-value">{category.engine}</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Condition</span>
                            <span className="spec-value">{listing.condition}</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Location</span>
                            <span className="spec-value">{listing.location}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="description-section">
                        <h3>Description</h3>
                        <p>{listing.description}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button className="contact-button">Contact Seller</button>
                        <button className="save-button">Save Listing</button>
                    </div>
                </div>
            </div>
        </div>
    );
}