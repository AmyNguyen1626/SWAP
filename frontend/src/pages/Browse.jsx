import { useEffect, useState } from "react";
import { fetchListings } from "../services/listingService";
import ListingCard from "../components/ListingCard";
import "./Browse.css";

export default function Browse() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [makeFilter, setMakeFilter] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minYear, setMinYear] = useState("");
    const [maxYear, setMaxYear] = useState("");
    const [sortOption, setSortOption] = useState("newest");
    const [filterCondition, setFilterCondition] = useState("all");
    const AU_MAKES = [
        "Toyota","Mazda","Hyundai","Kia","Honda",
        "Subaru","Mitsubishi","Nissan","Ford","Volkswagen",
         "BMW","Mercedes-Benz","Audi"
    ];

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

// Filter + Sort listings
let filteredListings = listings.filter((listing) => {
  const q = searchQuery.toLowerCase();

  const matchesSearch =
    listing.listingName?.toLowerCase().includes(q) ||
    listing.location?.toLowerCase().includes(q) ||
    listing.category?.make?.toLowerCase().includes(q) ||
    listing.category?.model?.toLowerCase().includes(q);

  const matchesMake =
    !makeFilter || listing.category?.make?.toLowerCase() === makeFilter.toLowerCase();

  const year = Number(listing.year || listing.modelYear || 0);
  const price = Number(listing.price || 0);

  const matchesYear =
    (!minYear || year >= Number(minYear)) &&
    (!maxYear || year <= Number(maxYear));

  const matchesPrice =
    (!minPrice || price >= Number(minPrice)) &&
    (!maxPrice || price <= Number(maxPrice));

  return matchesSearch && matchesMake && matchesYear && matchesPrice;
});

// Sort choices
filteredListings = filteredListings.sort((a, b) => {
  const yearA = Number(a.year || a.modelYear || 0);
  const yearB = Number(b.year || b.modelYear || 0);
  const priceA = Number(a.price || 0);
  const priceB = Number(b.price || 0);
  const kmA = Number(a.kilometers || a.km || 0);
  const kmB = Number(b.kilometers || b.km || 0);

  switch (sortOption) {
    case "price-asc": return priceA - priceB;
    case "price-desc": return priceB - priceA;
    case "km-asc": return kmA - kmB;
    case "km-desc": return kmB - kmA;
    case "year-desc": return yearB - yearA; // Newest → Oldest
    case "year-asc": return yearA - yearB;  // Oldest → Newest
    case "newest":
    default: {
      // fallback to createdAt when available
      const dA = new Date(a.createdAt || a.timestamp || 0).getTime();
      const dB = new Date(b.createdAt || b.timestamp || 0).getTime();
      return dB - dA;
    }
  }
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


{/* Actions: Filter & Sort */}
<div className="browse-actions">
  {/* FILTER BUTTON */}
  <div className="menu-wrap">
    <button
      className="menu-btn"
      onClick={() => { setShowFilter((v) => !v); setShowSort(false); }}
      aria-haspopup="true"
      aria-expanded={showFilter}
    >
      Filter ≔
    </button>

    {showFilter && (
      <div className="dropdown">
        {/* Row: Make with hover submenu */}
        <div className="dropdown-item has-submenu">
          <span>Make</span>
          <div className="submenu">
            <select
              className="filter-select"
              value={makeFilter}
              onChange={(e) => setMakeFilter(e.target.value)}
            >
              <option value="">All Makes</option>
              {AU_MAKES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row: Year range */}
        <div className="dropdown-item">
          <span>Year</span>
          <div className="range-row">
            <label>From</label>
            <input
              type="number"
              className="filter-input"
              value={minYear}
              onChange={(e) => setMinYear(e.target.value)}
              placeholder="e.g. 2015"
            />
            <label>To</label>
            <input
              type="number"
              className="filter-input"
              value={maxYear}
              onChange={(e) => setMaxYear(e.target.value)}
              placeholder="e.g. 2024"
            />
          </div>
        </div>

        {/* Row: Price range */}
        <div className="dropdown-item price-item">
  <span>Price</span>
  <div className="range-row">
    <label>From AUD$</label>
    <input
      type="number"
      className="filter-input"
      value={minPrice}
      onChange={(e) => setMinPrice(e.target.value)}
      placeholder="Min"
    />
    <label>To AUD$</label>
    <input
      type="number"
      className="filter-input"
      value={maxPrice}
      onChange={(e) => setMaxPrice(e.target.value)}
      placeholder="Max"
    />
  </div>
</div>

      </div>
    )}
  </div>

  {/* SORT BUTTON */}
  <div className="menu-wrap">
    <button
      className="menu-btn"
      onClick={() => { setShowSort((v) => !v); setShowFilter(false); }}
      aria-haspopup="true"
      aria-expanded={showSort}
    >
      Sort ▼
    </button>

    {showSort && (
      <div className="dropdown">
        <button className="drop-item" onClick={() => setSortOption("price-asc")}>
          Price: Low → High
        </button>
        <button className="drop-item" onClick={() => setSortOption("price-desc")}>
          Price: High → Low
        </button>
        <button className="drop-item" onClick={() => setSortOption("year-desc")}>
          Year: Newest → Oldest
        </button>
        <button className="drop-item" onClick={() => setSortOption("year-asc")}>
          Year: Oldest → Newest
        </button>
        <button className="drop-item" onClick={() => setSortOption("km-asc")}>
          KM: Low → High
        </button>
        <button className="drop-item" onClick={() => setSortOption("km-desc")}>
          KM: High → Low
        </button>
      </div>
    )}
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