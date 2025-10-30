import { useState, useEffect } from "react";
import { getIdToken } from "firebase/auth";
import { useAuth } from "../contexts/useAuth";
import "./SwapRequestModal.css";
import { createConversation } from "../services/messageService";

export default function SwapRequestModal({
    targetListing,
    isOpen,
    onClose,
    onSuccess
}) {
    const { currentUser } = useAuth();
    const [requestType, setRequestType] = useState("buy"); // 'buy' or 'swap'
    const [myListings, setMyListings] = useState([]);
    const [selectedListingId, setSelectedListingId] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen && requestType === "swap") {
            fetchMyListings();
        }
    }, [isOpen, requestType]);

    async function fetchMyListings() {
        try {
            const token = await getIdToken(currentUser);

            const res = await fetch("http://localhost:3000/api/listings/user/my-listings", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Failed to fetch your listings");

            const data = await res.json();
            // Filter out the target listing
            const availableListings = data.filter(
                listing => listing.id !== targetListing.id && listing.status === "active"
            );
            setMyListings(availableListings);

            if (availableListings.length > 0) {
                setSelectedListingId(availableListings[0].id);
            }
        } catch (err) {
            console.error("Error fetching listings:", err);
            setError(err.message);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const token = await getIdToken(currentUser);

            const requestData = {
                targetListingId: targetListing.id,
                requestType,
                message: message.trim()
            };

            if (requestType === "swap") {
                if (!selectedListingId) {
                    setError("Please select a listing to offer");
                    setLoading(false);
                    return;
                }
                requestData.offeredListingId = selectedListingId;
            }

            // Send swap/buy request
            const res = await fetch("http://localhost:3000/api/swap-requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to send request");
            }

            // Create conversation
            const participants = [targetListing.userId, currentUser.uid];
            const initialMsg = message.trim() || "";

            await createConversation(
                {
                    id: targetListing.id,
                    listingName: targetListing.listingName
                },
                participants,
                token,
                initialMsg
            );

            // Success
            if (onSuccess) onSuccess();
            onClose();

            // Reset form
            setRequestType("buy");
            setMessage("");
            setSelectedListingId("");
        } catch (err) {
            console.error("Error sending request:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function handleClose() {
        setError("");
        setMessage("");
        setRequestType("buy");
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content swap-request-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Request this Listing</h2>
                    <button className="close-btn" onClick={handleClose}>&times;</button>
                </div>

                <div className="target-listing-preview">
                    <img src={targetListing.images[0]} alt={targetListing.listingName} />
                    <div>
                        <h3>{targetListing.listingName}</h3>
                        <p className="price">${targetListing.price}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Request Type</label>
                        <div className="request-type-selector">
                            <button
                                type="button"
                                className={`type-btn ${requestType === "buy" ? "active" : ""}`}
                                onClick={() => setRequestType("buy")}
                            >
                                <span className="icon">💰</span>
                                <span>Buy</span>
                                <p>Express interest in purchasing</p>
                            </button>
                            <button
                                type="button"
                                className={`type-btn ${requestType === "swap" ? "active" : ""}`}
                                onClick={() => setRequestType("swap")}
                            >
                                <span className="icon">🔄</span>
                                <span>Swap</span>
                                <p>Offer one of your listings in exchange</p>
                            </button>
                        </div>
                    </div>

                    {requestType === "swap" && (
                        <div className="form-group">
                            <label>Select Your Listing to Offer *</label>
                            {myListings.length === 0 ? (
                                <div className="no-listings-message">
                                    <p>You don't have any active listings to swap.</p>
                                    <p>Create a listing first to offer a swap!</p>
                                </div>
                            ) : (
                                <select
                                    value={selectedListingId}
                                    onChange={(e) => setSelectedListingId(e.target.value)}
                                    required
                                >
                                    {myListings.map(listing => (
                                        <option key={listing.id} value={listing.id}>
                                            {listing.listingName} - ${listing.price}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    )}

                    <div className="form-group">
                        <label>Message (Optional)</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Add a message to the seller..."
                            rows="4"
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <div className="modal-actions">
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading || (requestType === "swap" && myListings.length === 0)}
                        >
                            {loading ? "Sending..." : "Send Request"}
                        </button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}