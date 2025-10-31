import { useEffect, useState } from "react";
import { fetchListings } from "../services/listingService";
import ListingCard from "../components/ListingCard";
import "./Browse.css";

export default function Browse() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
    async function getAllListings() {
        setLoading(true);
        try {
            const result = await fetchListings(); 
            
            // Filter out non-active listings
            const activeListings = result.filter(listing => 
                listing.status === "active" || !listing.status
            ); 
            
            setListings(activeListings); 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    getAllListings();
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
                            id={listing.id}
                            image={listing.images && listing.images[0] ? listing.images[0] : "/assets/placeholder-car.png"}
                            name={listing.listingName}
                            price={listing.price}
                            condition={listing.condition}
                            location={listing.location}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}