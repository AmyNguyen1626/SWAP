import axios from "axios";

const SWAP_REQUEST_API_BASE = "http://localhost:3000/api/swap-requests/";

export async function createSwapRequest(requestData, token) {
  try {
    const response = await axios.post(SWAP_REQUEST_API_BASE, requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error creating swap request:", err.response?.data || err.message);
    throw new Error(err.response?.data?.error || "Failed to send request");
  }
}
