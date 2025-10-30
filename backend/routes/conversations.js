const express = require("express");
const admin = require("firebase-admin");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();
const db = getFirestore();

// POST api/conversations
router.post("/", verifyToken, async (req, res) => {
    const userId = req.user.uid;
    const { participants, listingId, initialMessage } = req.body;

    try {
        const userRecord = await admin.auth().getUser(userId);
        const senderEmail = userRecord.email;
        const messageText = initialMessage?.trim() ||
            `Hi! I'm interested in your listing "${listingId?.listingName || "this item"}".`; //  add auto message if left empty 

        // Start the convo with 2 participants
        const convoSnapshot = await db.collection("conversations")
            .where("participants", "array-contains", userId)
            .get();

        let existingConvo = null;

        convoSnapshot.forEach(doc => {
            const data = doc.data();
            // check if all participants match exactly
            const sameParticipants = participants.length === data.participants.length &&
                participants.every(p => data.participants.includes(p));
            if (sameParticipants) {
                existingConvo = { id: doc.id, ...data };
            }
        });

        if (existingConvo) {
            // Add message to existing conversation
            await db.collection("conversations")
                .doc(existingConvo.id)
                .collection("messages")
                .add({
                    senderId: userId,
                    senderEmail,
                    text: messageText,
                    timestamp: Timestamp.now(),
                    read: false,
                });

            return res.status(200).json({ ...existingConvo, newMessage: messageText });
        }

        // If no existing convo, then create new
        const convoRef = await db.collection("conversations").add({
            participants,
            listingId: listingId || null,
            lastUpdated: Timestamp.now(),
        });

        const messageRef = await db.collection("conversations")
            .doc(convoRef.id)
            .collection("messages")
            .add({
                senderId: userId,
                senderEmail,
                text: messageText,
                timestamp: Timestamp.now(),
                read: false,
            });

        res.status(201).json({
            id: convoRef.id,
            participants,
            listingId,
            messages: [{ id: messageRef.id, senderId: userId, text: messageText }],
        });

    } catch (err) {
        console.error("Failed to create conversation:", err);
        res.status(500).json({ error: "Failed to create conversation" });
    }
});

// POST api/conversations/:convoId/messages
router.post("/:convoId/messages", verifyToken, async (req, res) => {
    const senderId = req.user.uid;
    const convoId = req.params.convoId;
    const { text } = req.body;

    if (!text || text.trim() === "") {
        return res.status(400).json({ error: "Message text is required" });
    }

    try {
        // Add the new message
        const messageRef = await db
            .collection("conversations")
            .doc(convoId)
            .collection("messages")
            .add({
                senderId,
                senderEmail,
                text: text.trim(),
                timestamp: Timestamp.now(),
                read: false
            });

        // Update lastUpdated in conversation
        const convoRef = db.collection("conversations").doc(convoId);
        await convoRef.update({ lastUpdated: Timestamp.now() });

        // Fetch all messages after adding
        const messagesSnapshot = await db
            .collection("conversations")
            .doc(convoId)
            .collection("messages")
            .orderBy("timestamp")
            .get();

        const messages = messagesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(201).json({ id: messageRef.id, messages });

    } catch (err) {
        console.error("Failed to send message:", err);
        res.status(500).json({ error: "Failed to send message" });
    }
});

// GET api/conversations/:convoId/messages
router.get("/:convoId/messages", verifyToken, async (req, res) => {
    const convoId = req.params.convoId;

    try {
        const snapshot = await db
            .collection("conversations")
            .doc(convoId)
            .collection("messages")
            .orderBy("timestamp")
            .get();

        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(messages);
    } catch (err) {
        console.error("Failed to fetch messages:", err);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

// GET api/conversations?userId=abc
router.get("/", verifyToken, async (req, res) => {
    const userId = req.user.uid;

    try {
        const snapshot = await db
            .collection("conversations")
            .where("participants", "array-contains", userId)
            .orderBy("lastUpdated", "desc")
            .get();

        const conversations = await Promise.all(
            snapshot.docs.map(async doc => {
                const data = doc.data();

                // Find the other participant
                const otherParticipantUid = data.participants.find(uid => uid !== userId);

                let displayEmail = otherParticipantUid; // fallback to UID if email lookup fails
                try {
                    const userRecord = await admin.auth().getUser(otherParticipantUid);
                    displayEmail = userRecord.email;
                } catch (err) {
                    console.warn(`Failed to fetch email for UID ${otherParticipantUid}:`, err);
                }

                return {
                    id: doc.id,
                    listingId: data.listingId,
                    participants: data.participants,
                    displayEmail,
                    lastUpdated: data.lastUpdated
                };
            })
        );

        res.json(conversations);
    } catch (err) {
        console.error("Failed to fetch conversations:", err);
        res.status(500).json({ error: "Failed to fetch conversations" });
    }
});

module.exports = router;