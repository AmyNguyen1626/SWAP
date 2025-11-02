// Frontend notification service
import { getIdToken } from "firebase/auth";

/**
 * Fetch unread notification counts for the current user
 * @param {string} token - Firebase auth token
 * @returns {Promise<Object>} - Object with message and request counts broken down by type
 */
export async function getNotificationCounts(token) {
    try {
        const res = await fetch("http://localhost:3000/api/notifications/counts", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("Failed to fetch notification counts");

        return await res.json();
    } catch (err) {
        console.error("Error fetching notification counts:", err);
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
        const res = await fetch(`http://localhost:3000/api/notifications/messages/${convoId}/read`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("Failed to mark messages as read");

        return await res.json();
    } catch (err) {
        console.error("Error marking messages as read:", err);
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
        const res = await fetch(`http://localhost:3000/api/notifications/requests/${requestId}/viewed`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("Failed to mark request as viewed");

        return await res.json();
    } catch (err) {
        console.error("Error marking request as viewed:", err);
        throw err;
    }
}

/**
 * Mark all received requests as viewed
 * @param {string} token - Firebase auth token
 */
export async function markReceivedRequestsAsViewed(token) {
    try {
        const res = await fetch("http://localhost:3000/api/notifications/requests/received/view-all", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("Failed to mark received requests as viewed");

        return await res.json();
    } catch (err) {
        console.error("Error marking received requests as viewed:", err);
        throw err;
    }
}

/**
 * Mark all sent requests as viewed
 * @param {string} token - Firebase auth token
 */
export async function markSentRequestsAsViewed(token) {
    try {
        const res = await fetch("http://localhost:3000/api/notifications/requests/sent/view-all", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("Failed to mark sent requests as viewed");

        return await res.json();
    } catch (err) {
        console.error("Error marking sent requests as viewed:", err);
        throw err;
    }
}