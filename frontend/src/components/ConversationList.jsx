import { useEffect, useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { getConversations } from "../services/messageService";
import "./ConversationList.css";

export default function ConversationsList({ onSelectConversation }) {
    const { currentUser } = useAuth();
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchConversations = async () => {
        if (!currentUser) return;
        try {
            const token = await currentUser.getIdToken(true);
            const data = await getConversations(token);
            console.log("Fetched conversations:", data);
            setConversations(data);
        } catch (err) {
            console.error("Error fetching conversations:", err);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchConversations().finally(() => setLoading(false));

        // Poll every 30 seconds for new conversations
        const interval = setInterval(() => fetchConversations(), 30000);
        return () => clearInterval(interval);
    }, [currentUser]);

    if (loading) return <p>Loading conversations...</p>;
    if (conversations.length === 0) return <p>No conversations yet</p>;

    return (
        <ul className="conversations-list">
            {conversations.map(convo => (
                <li
                    key={convo.id}
                    className="conversation-item"
                    onClick={() => onSelectConversation(convo.id)}
                >
                    <span className="conversation-email">{convo.displayEmail}</span>
                    <span className="conversation-updated">
                        Last updated: {new Date(convo.lastUpdated._seconds * 1000).toLocaleString()}
                    </span>
                </li>
            ))}
        </ul>
    );
}
