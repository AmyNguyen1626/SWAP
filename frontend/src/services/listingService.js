import axios from "axios";
import { getIdToken } from "firebase/auth";

const LISTING_API_BASE = "http://localhost:3000/api/listings";

// Create new listing
export async function createListing(listingData, token) {
  try {
    const response = await axios.post(LISTING_API_BASE, listingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error creating listing:", err.response?.data || err.message);
    throw err;
  }
}

// Fetch all listings
export async function fetchListings() {
  try {
    const response = await axios.get(LISTING_API_BASE);
    return response.data;
  } catch (err) {
    console.error("Error fetching listings:", err.response?.data || err.message);
    throw err;
  }
}

// Edit an existing listing
export async function editListing(listingId, listingData, token) {
  try {
    const response = await axios.patch(`${LISTING_API_BASE}/${listingId}`, listingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error updating listing:", err.response?.data || err.message);
    throw err;
  }
}

// Fetch user listings
export async function fetchUserListings(currentUser, excludeListingId) {
  if (!currentUser) throw new Error("No user logged in");

  try {
    const token = await getIdToken(currentUser);
    const response = await axios.get(`${LISTING_API_BASE}/user/my-listings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Filter out a specific listing
    return response.data.filter(
      (listing) => listing.id !== excludeListingId && listing.status === "active"
    );
  } catch (err) {
    console.error("Error fetching user listings:", err.response?.data || err.message);
    throw err;
  }
}

// Fetch listing by Id
export async function fetchListingById(listingId) {
  try {
    const response = await axios.get(`${LISTING_API_BASE}/${listingId}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching listing by ID:", err.response?.data || err.message);
    throw err;
  }
} 