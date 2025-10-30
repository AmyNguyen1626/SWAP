import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Get all conversations for the current user
export async function getConversations(token) {
    try {
        const res = await axios.get(`${API_URL}/conversations`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    } catch (err) {
        console.error("Error fetching conversations:", err);
        throw err;
    }
}

// Get messages for a specific conversation
export async function getMessages(convoId, token) {
    try {
        const res = await axios.get(`${API_URL}/conversations/${convoId}/messages`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    } catch (err) {
        console.error("Error fetching messages:", err);
        throw err;
    }
}

// Send a message in a conversation
export async function sendMessage(convoId, text, token) {
    try {
        const res = await axios.post(
            `${API_URL}/conversations/${convoId}/messages`,
            { text },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data;
    } catch (err) {
        console.error("Error sending message:", err);
        throw err;
    }
}

// Create a new conversation
export async function createConversation(listingId, participants, token, initialMessage) {
    try {
        const res = await axios.post(
            `${API_URL}/conversations`,
            { listingId, participants, initialMessage },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data; 
    } catch (err) {
        console.error("Error creating conversation:", err);
        throw err;
    }
}
