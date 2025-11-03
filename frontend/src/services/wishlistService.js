import axios from "axios";
import { getIdToken } from "firebase/auth";

const WISHLIST_API_BASE = "http://localhost:3000/api/wishlist/";

// Check if listing is in user's wishlist
export async function checkWishlist(currentUser, listingId) {
    if (!currentUser) throw new Error("No user logged in");
    try {
        const token = await getIdToken(currentUser);
        const response = await axios.get(`${WISHLIST_API_BASE}/check/${listingId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.inWishlist;
    } catch (err) {
        console.error("Error checking wishlist:", err.response?.data || err.message);
        throw err;
    }
}

// Toggle wishlist (Add/remove)
export async function toggleWishlist(currentUser, listingId, isCurrentlyInWishlist) {
    if (!currentUser) throw new Error("No user logged in");
    try {
        const token = await getIdToken(currentUser);
        if (isCurrentlyInWishlist) {
            // Remove from wishlist
            await axios.delete(`${WISHLIST_API_BASE}/listing/${listingId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return false;
        } else {
            // Add to wishlist
            await axios.post(
                WISHLIST_API_BASE,
                { listingId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return true;
        }
    } catch (err) {
        console.error("Error toggling wishlist:", err.response?.data || err.message);
        throw err;
    }
}