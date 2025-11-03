import axios from "axios";

const NOTIFICATION_API_URL = "http://localhost:3000/api/notifications";

/**
 * Fetch unread notification counts for the current user
 * @param {string} token - Firebase auth token
 * @returns {Promise<Object>} - Object with message and request counts broken down by type
 */
export async function getNotificationCounts(token) {
    try {
        const response = await axios.get(`${NOTIFICATION_API_URL}/counts`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (err) {
        console.error("Error fetching notification counts:", err.response?.data || err.message);
        throw err;
    }
}

/**
 * Mark messages in a conversation as read
 * @param {string} convoId - Conversation ID
 * @param {string} token - Firebase auth token
 */
export async function markMessagesAsRead(convoId, token) {
    try {
        const response = await axios.post(
            `${NOTIFICATION_API_URL}/messages/${convoId}/read`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (err) {
        console.error("Error marking messages as read:", err.response?.data || err.message);
        throw err;
    }
}

/**
 * Mark a swap request notification as viewed
 * @param {string} requestId - Swap request ID
 * @param {string} token - Firebase auth token
 */
export async function markRequestAsViewed(requestId, token) {
    try {
        const response = await axios.post(
            `${NOTIFICATION_API_URL}/requests/${requestId}/viewed`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (err) {
        console.error("Error marking request as viewed:", err.response?.data || err.message);
        throw err;
    }
}

/**
 * Mark all received requests as viewed
 * @param {string} token - Firebase auth token
 */
export async function markReceivedRequestsAsViewed(token) {
    try {
        const response = await axios.post(
            `${NOTIFICATION_API_URL}/requests/received/view-all`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (err) {
        console.error("Error marking received requests as viewed:", err.response?.data || err.message);
        throw err;
    }
}

/**
 * Mark all sent requests as viewed
 * @param {string} token - Firebase auth token
 */
export async function markSentRequestsAsViewed(token) {
    try {
        const response = await axios.post(
            `${NOTIFICATION_API_URL}/requests/sent/view-all`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (err) {
        console.error("Error marking sent requests as viewed:", err.response?.data || err.message);
        throw err;
    }
}
