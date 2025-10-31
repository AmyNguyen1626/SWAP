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

            // Use the most recent lastUpdated timestamp
            const lastUpdated = conversations.length
                ? conversations[0].lastUpdated._seconds * 1000
                : undefined;

            const params = lastUpdated ? { after: lastUpdated } : {};
            const data = await getConversations(token, params);

            // Merge without duplicates
            setConversations(prev => {
                const existingIds = new Set(prev.map(c => c.id));
                const newConvos = data.filter(c => !existingIds.has(c.id));
                return [...newConvos, ...prev].sort(
                    (a, b) => (b.lastUpdated._seconds || 0) - (a.lastUpdated._seconds || 0)
                );
            });
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
