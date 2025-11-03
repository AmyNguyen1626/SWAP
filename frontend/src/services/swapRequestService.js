import axios from "axios";

export async function createSwapRequest(requestData, token) {
    try {
        const res = await axios.post(
            "http://localhost:3000/api/swap-requests",
            requestData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error creating swap request:", err);
        throw new Error(err.response?.data?.error || "Failed to send request");
    }
}
