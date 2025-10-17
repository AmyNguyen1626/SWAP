import { useEffect, useState } from "react";
import { getAllListings } from "../services/firestoreService";
import ListingCard from "../components/ListingCard";
import "./Browse.css";

export default function Browse() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchListings() {
            setLoading(true);
            const result = await getAllListings();
            
            if (result.success) {
                setListings(result.listings);
            } else {
                setError(result.error);
            }
            setLoading(false);
        }

        fetchListings();
    }, []);

    // Filter listings based on search query
    const filteredListings = listings.filter((listing) => {
        const query = searchQuery.toLowerCase();
        return (
            listing.listingName?.toLowerCase().includes(query) ||
            listing.location?.toLowerCase().includes(query) ||
            listing.category?.make?.toLowerCase().includes(query) ||
            listing.category?.model?.toLowerCase().includes(query)
        );
    });

    return (
        <div className="browse-container">
            {/* Search Bar */}
            <div className="browse-header">
                <h1>Browse</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search vehicles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="search-btn">🔍</button>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="loading-message">
                    <p>Loading listings...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="error-message">
                    <p>Error: {error}</p>
                </div>
            )}

            {/* No Listings */}
            {!loading && !error && filteredListings.length === 0 && (
                <div className="no-listings">
                    <p>No listings found. {searchQuery && "Try a different search term."}</p>
                </div>
            )}

            {/* Listings Grid */}
            {!loading && !error && filteredListings.length > 0 && (
                <div className="listings-grid">
                    {filteredListings.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            image={listing.images && listing.images[0] ? listing.images[0] : "/assets/placeholder-car.png"}
                            name={listing.listingName}
                            condition={listing.condition}
                            location={listing.location}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}