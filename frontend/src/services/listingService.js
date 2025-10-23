export async function createListing(listingData, token) {
  try {
    const response = await fetch("/api/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // for protected route
      },
      body: JSON.stringify(listingData),
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