// Create new listing
export async function createListing(listingData, token) {
  try {
    const response = await fetch("http://localhost:3000/api/listings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // for protected route
      },
      body: listingData,
    });

    if (!response.ok) {
      throw new Error("Failed to create listing");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error creating listing:", err);
    throw err;
  }
}

// Fetch all listings
export async function fetchListings() {
  try {
    const response = await fetch("http://localhost:3000/api/listings", {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch listings");
    }

    const listings = await response.json();
    return listings;
  } catch (err) {
    console.error("Error fetching listings:", err);
    throw err;
  }
}

// Edit an exisiting listing

export async function editListing(listingId, listingData, token) {
  try {
    const response = await fetch(`http://localhost:3000/api/listings/${listingId}`,{
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: listingData,
    });

    if(!response.ok){
      throw new Error("Failed to Update Listing");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error Updating Listing:", err);
    throw err;
  }
}