import { useEffect, useState } from "react";
import { getIdToken } from "firebase/auth";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import "./profile.css";

export default function Profile() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("listings");
    
    const [myListings, setMyListings] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [listingsLoading, setListingsLoading] = useState(false);
    const [requestsLoading, setRequestsLoading] = useState(false);
    const [wishlistLoading, setWishlistLoading] = useState(false);
    
    const [showSwapModal, setShowSwapModal] = useState(false);
    const [selectedTargetListing, setSelectedTargetListing] = useState(null);
    
    const [showContactModal, setShowContactModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [contactInfo, setContactInfo] = useState({ email: "", phone: "" });

    useEffect(() => {
        async function fetchProfile() {
            try {
                setLoading(true);
                const token = await getIdToken(currentUser);
                const res = await fetch("http://localhost:3000/users/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error("Failed to fetch profile");
                const data = await res.json();
                setProfile(data.user);
                setContactInfo({ email: data.user.email || "", phone: "" });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [currentUser]);

    useEffect(() => {
        if (activeTab === "listings") fetchMyListings();
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === "received-requests") fetchReceivedRequests();
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === "sent-requests") fetchSentRequests();
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === "wishlist") fetchWishlist();
    }, [activeTab]);

    async function fetchMyListings() {
        try {
            setListingsLoading(true);
            const token = await getIdToken(currentUser);
            const res = await fetch("http://localhost:3000/api/listings/user/my-listings", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to fetch listings");
            const data = await res.json();
            setMyListings(data);
        } catch (err) {
            console.error("Error fetching listings:", err);
            setError(err.message);
        } finally {
            setListingsLoading(false);
        }
    }

    async function fetchReceivedRequests() {
        try {
            setRequestsLoading(true);
            const token = await getIdToken(currentUser);
            const res = await fetch("http://localhost:3000/api/swap-requests/received", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to fetch received requests");
            const data = await res.json();
            setReceivedRequests(data);
        } catch (err) {
            console.error("Error fetching received requests:", err);
            setError(err.message);
        } finally {
            setRequestsLoading(false);
        }
    }

    async function fetchSentRequests() {
        try {
            setRequestsLoading(true);
            const token = await getIdToken(currentUser);
            const res = await fetch("http://localhost:3000/api/swap-requests/sent", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to fetch sent requests");
            const data = await res.json();
            setSentRequests(data);
        } catch (err) {
            console.error("Error fetching sent requests:", err);
            setError(err.message);
        } finally {
            setRequestsLoading(false);
        }
    }

    async function fetchWishlist() {
        try {
            setWishlistLoading(true);
            const token = await getIdToken(currentUser);
            const res = await fetch("http://localhost:3000/api/wishlist", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to fetch wishlist");
            const data = await res.json();
            setWishlist(data);
        } catch (err) {
            console.error("Error fetching wishlist:", err);
            setError(err.message);
        } finally {
            setWishlistLoading(false);
        }
    }

    async function handleDeleteListing(listingId) {
        if (!confirm("Are you sure you want to delete this listing?")) return;
        try {
            const token = await getIdToken(currentUser);
            const res = await fetch(`http://localhost:3000/api/listings/${listingId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to delete listing");
            setMyListings(myListings.filter(listing => listing.id !== listingId));
        } catch (err) {
            console.error("Error deleting listing:", err);
            alert("Failed to delete listing");
        }
    }

    async function handleRemoveFromWishlist(wishlistId) {
        try {
            const token = await getIdToken(currentUser);
            const res = await fetch(`http://localhost:3000/api/wishlist/${wishlistId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to remove from wishlist");
            setWishlist(wishlist.filter(item => item.id !== wishlistId));
        } catch (err) {
            console.error("Error removing from wishlist:", err);
            alert("Failed to remove from wishlist");
        }
    }

    // Function to navigate to the listing detail page
    const navigateToListing = (listingId) => {
        navigate(`/listing/${listingId}`);
    };

    function handleAcceptRequest(request) {
        setSelectedRequest(request);
        setShowContactModal(true);
    }

    async function confirmAcceptRequest() {
        if (!selectedRequest || !contactInfo.email) return;
        try {
            const token = await getIdToken(currentUser);
            const res = await fetch(`http://localhost:3000/api/swap-requests/${selectedRequest.id}/accept`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ contactInfo }),
            });
            if (!res.ok) throw new Error("Failed to accept request");

            // Update received requests status locally
            const updatedRequests = receivedRequests.map(req => 
                req.id === selectedRequest.id ? { ...req, status: "accepted" } : req
            );
            setReceivedRequests(updatedRequests);
            setShowContactModal(false);
        } catch (err) {
            console.error("Error accepting request:", err);
            alert("Failed to accept request");
        }
    }

    async function handleRejectRequest(requestId) {
        if (!confirm("Are you sure you want to reject this request?")) return;
        try {
            const token = await getIdToken(currentUser);
            const res = await fetch(`http://localhost:3000/api/swap-requests/${requestId}/reject`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to reject request");
            
            // Update received requests status locally
            const updatedRequests = receivedRequests.map(req => 
                req.id === requestId ? { ...req, status: "rejected" } : req
            );
            setReceivedRequests(updatedRequests);
        } catch (err) {
            console.error("Error rejecting request:", err);
            alert("Failed to reject request");
        }
    }

    async function handleCancelRequest(requestId) {
        if (!confirm("Are you sure you want to cancel this request?")) return;
        try {
            const token = await getIdToken(currentUser);
            const res = await fetch(`http://localhost:3000/api/swap-requests/${requestId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to cancel request");
            
            // Remove request from the list
            setSentRequests(sentRequests.filter(req => req.id !== requestId));
        } catch (err) {
            console.error("Error canceling request:", err);
            alert("Failed to cancel request");
        }
    }
    
    async function handleAcceptRequest(request) {
        setSelectedRequest(request);
        setShowContactModal(true);
    }

    async function confirmAcceptRequest() {
        if (!contactInfo.email) {
            alert("Please provide at least an email address");
            return;
        }
        try {
            const token = await getIdToken(currentUser);
            const res = await fetch(`http://localhost:3000/api/swap-requests/${selectedRequest.id}/accept`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contactInfo }),
            });
            if (!res.ok) throw new Error("Failed to accept request");
            setReceivedRequests(receivedRequests.map(req => 
                req.id === selectedRequest.id ? { ...req, status: "accepted" } : req
            ));
            setShowContactModal(false);
            setSelectedRequest(null);
        } catch (err) {
            console.error("Error accepting request:", err);
            alert("Failed to accept request");
        }
    }

    async function handleRejectRequest(requestId) {
        if (!confirm("Are you sure you want to reject this request?")) return;
        try {
            const token = await getIdToken(currentUser);
            const res = await fetch(`http://localhost:3000/api/swap-requests/${requestId}/reject`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to reject request");
            setReceivedRequests(receivedRequests.map(req => 
                req.id === requestId ? { ...req, status: "rejected" } : req
            ));
        } catch (err) {
            console.error("Error rejecting request:", err);
            alert("Failed to reject request");
        }
    }

    async function handleCancelRequest(requestId) {
        if (!confirm("Are you sure you want to cancel this request?")) return;
        try {
            const token = await getIdToken(currentUser);
            const res = await fetch(`http://localhost:3000/api/swap-requests/${requestId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to cancel request");
            setSentRequests(sentRequests.filter(req => req.id !== requestId));
        } catch (err) {
            console.error("Error canceling request:", err);
            alert("Failed to cancel request");
        }
    }

    if (loading) return <div className="profile-container"><p>Loading...</p></div>;
    if (error) return <div className="profile-container"><p className="error-message">{error}</p></div>;
    if (!profile) return <div className="profile-container"><p>No profile found</p></div>;

    return (
        <div className="profile-container">
            <div className="profile-header-section">
                <h1 className="profile-header">My Profile</h1>
            </div>

            <div className="tabs">
                <button className={`tab ${activeTab === "listings" ? "active" : ""}`} onClick={() => setActiveTab("listings")}>
                    My Listings
                </button>
                <button className={`tab ${activeTab === "received-requests" ? "active" : ""}`} onClick={() => setActiveTab("received-requests")}>
                    Received Requests
                </button>
                <button className={`tab ${activeTab === "sent-requests" ? "active" : ""}`} onClick={() => setActiveTab("sent-requests")}>
                    Sent Requests
                </button>
                <button className={`tab ${activeTab === "wishlist" ? "active" : ""}`} onClick={() => setActiveTab("wishlist")}>
                    Wishlist
                </button>
            </div>

            <div className="tab-content">
                {activeTab === "listings" && (
                    <div className="listings-section">
                        <h2>My Listings</h2>
                        <p className="section-description">Manage your active listings here.</p>
                        {listingsLoading ? (
                            <p>Loading listings...</p>
                        ) : myListings.length === 0 ? (
                            <p className="empty-state">You haven't created any listings yet.</p>
                        ) : (
                            <div className="listings-list">
                                {myListings.map(listing => (
                                    <div key={listing.id} className="listing-card">
                                        <div className="listing-card-header">
                                            <span className={`status-badge ${listing.status}`}>{listing.status}</span>
                                            <span className="listing-card-price">${listing.price}</span>
                                        </div>
                                        <div className="listing-card-body">
                                            <div className="listing-card-left">
                                                <img src={listing.images[0]} alt={listing.listingName} className="listing-card-image" />
                                                <div className="listing-card-location">{listing.condition} • {listing.location}</div>
                                            </div>
                                            <div className="listing-card-right">
                                                <h3 className="listing-card-name">{listing.listingName}</h3>
                                                <div className="listing-card-actions">
                                                    <button onClick={() => navigate(`/listing/${listing.id}`)} className="view-btn">View</button>
                                                    <button onClick={() => handleDeleteListing(listing.id)} className="delete-btn">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "received-requests" && (
                    <div className="requests-section">
                        <h2>Received Requests</h2>
                        <p className="section-description">These are requests from other users who want to swap or buy your listings.</p>
                        {requestsLoading ? (
                            <p>Loading requests...</p>
                        ) : receivedRequests.length === 0 ? (
                            <p className="empty-state">No requests received yet.</p>
                        ) : (
                            <div className="requests-list">
                                {receivedRequests.map(request => (
                                    <div key={request.id} className="request-item">
                                        <div className="request-header">
                                            <span className={`request-type ${request.requestType}`}>{request.requestType}</span>
                                            <span className={`request-status ${request.status}`}>{request.status}</span>
                                        </div>
                                        <div className="request-content">
                                            <div className="request-listing">
                                                <h4>Your Listing:</h4>
                                                {request.targetListing && (
                                                    <div className="mini-listing">
                                                        <img src={request.targetListing.images[0]} alt="" />
                                                        <div>
                                                            <p className="listing-name">{request.targetListing.listingName}</p>
                                                            <p className="listing-price">${request.targetListing.price}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {request.requestType === "swap" && request.offeredListing && (
                                                <div className="request-listing">
                                                    <h4>They're Offering:</h4>
                                                    <div className="mini-listing">
                                                        <img src={request.offeredListing.images[0]} alt="" />
                                                        <div>
                                                            <p className="listing-name">{request.offeredListing.listingName}</p>
                                                            <p className="listing-price">${request.offeredListing.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {request.message && (
                                                <div className="request-message">
                                                    <h4>Their Message:</h4>
                                                    <p>{request.message}</p>
                                                </div>
                                            )}
                                        </div>
                                        {request.status === "pending" && (
                                            <div className="request-actions">
                                                <button onClick={() => handleAcceptRequest(request)} className="accept-btn">Accept</button>
                                                <button onClick={() => handleRejectRequest(request.id)} className="reject-btn">Reject</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "sent-requests" && (
                    <div className="requests-section">
                        <h2>Sent Requests</h2>
                        <p className="section-description">Track your swap and buy requests to other users.</p>
                        {requestsLoading ? (
                            <p>Loading requests...</p>
                        ) : sentRequests.length === 0 ? (
                            <p className="empty-state">You haven't sent any requests yet.</p>
                        ) : (
                            <div className="requests-list">
                                {sentRequests.map(request => (
                                    <div key={request.id} className="request-item">
                                        <div className="request-header">
                                            <span className={`request-type ${request.requestType}`}>{request.requestType}</span>
                                            <span className={`request-status ${request.status}`}>{request.status}</span>
                                        </div>
                                        <div className="request-content">
                                            <div className="request-listing">
                                                <h4>You're Requesting:</h4>
                                                {request.targetListing && (
                                                    <div className="mini-listing">
                                                        <img src={request.targetListing.images[0]} alt="" />
                                                        <div>
                                                            <p className="listing-name">{request.targetListing.listingName}</p>
                                                            <p className="listing-price">${request.targetListing.price}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {request.requestType === "swap" && request.offeredListing && (
                                                <div className="request-listing">
                                                    <h4>You're Offering:</h4>
                                                    <div className="mini-listing">
                                                        <img src={request.offeredListing.images[0]} alt="" />
                                                        <div>
                                                            <p className="listing-name">{request.offeredListing.listingName}</p>
                                                            <p className="listing-price">${request.offeredListing.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {request.message && (
                                                <div className="request-message">
                                                    <h4>Your Message:</h4>
                                                    <p>{request.message}</p>
                                                </div>
                                            )}
                                            {request.status === "accepted" && request.contactInfo && (
                                                <div className="contact-info-display success">
                                                    <h4>Contact Info Received:</h4>
                                                    <p>Email: {request.contactInfo.email}</p>
                                                    {request.contactInfo.phone && <p>Phone: {request.contactInfo.phone}</p>}
                                                </div>
                                            )}
                                        </div>
                                        {request.status === "pending" && (
                                            <div className="request-actions">
                                                <button onClick={() => handleCancelRequest(request.id)} className="cancel-btn">Cancel Request</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "wishlist" && (
                    <div className="wishlist-section">
                        <h2>My Wishlist</h2>
                        <p className="section-description">Listings you've saved for later.</p>
                        {wishlistLoading ? (
                            <p>Loading wishlist...</p>
                        ) : wishlist.length === 0 ? (
                            <p className="empty-state">Your wishlist is empty. Browse listings to add some!</p>
                        ) : (
                            <div className="listings-list">
                                {wishlist.map(item => item.listing && (
                                    <div key={item.id} className="listing-card">
                                        <div className="listing-card-header">
                                            <span className="listing-card-price">${item.listing.price}</span>
                                        </div>
                                        <div className="listing-card-body">
                                            <div className="listing-card-left">
                                                <img src={item.listing.images[0]} alt={item.listing.listingName} className="listing-card-image" />
                                                <div className="listing-card-location">{item.listing.condition} • {item.listing.location}</div>
                                            </div>
                                            <div className="listing-card-right">
                                                <h3 className="listing-card-name">{item.listing.listingName}</h3>
                                                <div className="listing-card-actions">
                                                    <button onClick={() => navigate(`/listing/${item.listing.id}`)} className="view-btn">View</button>
                                                    <button onClick={() => handleRemoveFromWishlist(item.id)} className="remove-btn">Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {showContactModal && (
                <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Share Your Contact Information</h3>
                        <p>This information will be shared with the requester.</p>
                        <div className="form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                value={contactInfo.email}
                                onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                                placeholder="your@email.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone (Optional)</label>
                            <input
                                type="tel"
                                value={contactInfo.phone}
                                onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                                placeholder="(555) 123-4567"
                            />
                        </div>
                        <div className="modal-actions">
                            <button onClick={confirmAcceptRequest} className="confirm-btn">Accept & Share</button>
                            <button onClick={() => setShowContactModal(false)} className="cancel-modal-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}