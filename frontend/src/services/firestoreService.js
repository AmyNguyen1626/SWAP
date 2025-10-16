import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase";

// ==================== LISTINGS ====================

/**
 * Create a new vehicle listing
 */
export async function createListing(listingData) {
  try {
    const listingsRef = collection(db, "listings");
    const docRef = await addDoc(listingsRef, {
      ...listingData,
      status: "active",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, listingId: docRef.id };
  } catch (error) {
    console.error("Error creating listing:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Get all active listings
 */
export async function getAllListings() {
  try {
    const listingsRef = collection(db, "listings");
    const q = query(
      listingsRef,
      where("status", "==", "active"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    
    const listings = [];
    querySnapshot.forEach((doc) => {
      listings.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, listings };
  } catch (error) {
    console.error("Error fetching listings:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Get a single listing by ID
 */
export async function getListingById(listingId) {
  try {
    const listingRef = doc(db, "listings", listingId);
    const docSnap = await getDoc(listingRef);
    
    if (docSnap.exists()) {
      return { success: true, listing: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: "Listing not found" };
    }
  } catch (error) {
    console.error("Error fetching listing:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Get listings by user ID
 */
export async function getListingsByUserId(userId) {
  try {
    const listingsRef = collection(db, "listings");
    const q = query(
      listingsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    
    const listings = [];
    querySnapshot.forEach((doc) => {
      listings.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, listings };
  } catch (error) {
    console.error("Error fetching user listings:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Update a listing
 */
export async function updateListing(listingId, updates) {
  try {
    const listingRef = doc(db, "listings", listingId);
    await updateDoc(listingRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating listing:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete a listing
 */
export async function deleteListing(listingId) {
  try {
    const listingRef = doc(db, "listings", listingId);
    await deleteDoc(listingRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting listing:", error);
    return { success: false, error: error.message };
  }
}

// ==================== USERS ====================

/**
 * Create or update user profile
 */
export async function createOrUpdateUserProfile(userId, userData) {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      // Update existing profile
      await updateDoc(userRef, {
        ...userData,
        updatedAt: serverTimestamp()
      });
    } else {
      // Create new profile - use setDoc instead of updateDoc for new documents
      const { setDoc } = await import("firebase/firestore");
      await setDoc(userRef, {
        userId,
        ...userData,
        listingIds: [],
        reviewStats: {
          averageRating: 0,
          totalReviews: 0
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error creating/updating user profile:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Get user profile by ID
 */
export async function getUserProfile(userId) {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      return { success: true, user: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: "User profile not found" };
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { success: false, error: error.message };
  }
}

// ==================== REVIEWS ====================

/**
 * Create a review
 */
export async function createReview(reviewData) {
  try {
    const reviewsRef = collection(db, "reviews");
    const docRef = await addDoc(reviewsRef, {
      ...reviewData,
      createdAt: serverTimestamp()
    });
    
    // Update user's review stats
    await updateUserReviewStats(reviewData.reviewedUserId);
    
    return { success: true, reviewId: docRef.id };
  } catch (error) {
    console.error("Error creating review:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Get reviews for a user
 */
export async function getReviewsForUser(userId) {
  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(
      reviewsRef,
      where("reviewedUserId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    
    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, reviews };
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Update user's review statistics
 */
async function updateUserReviewStats(userId) {
  try {
    const reviewsResult = await getReviewsForUser(userId);
    
    if (reviewsResult.success) {
      const reviews = reviewsResult.reviews;
      const totalReviews = reviews.length;
      
      if (totalReviews > 0) {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / totalReviews;
        
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          "reviewStats.averageRating": parseFloat(averageRating.toFixed(1)),
          "reviewStats.totalReviews": totalReviews
        });
      }
    }
  } catch (error) {
    console.error("Error updating review stats:", error);
  }
}