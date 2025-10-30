import { useEffect, useState, useRef } from "react";
import { useAuth } from "../contexts/useAuth";
import { getMessages, sendMessage } from "../services/messageService";
import "./Message.css";

export default function Messages({ convoId }) {
    const { currentUser } = useAuth();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef();
    const pollingInterval = useRef(null);

    const fetchMessages = async () => {
        if (!convoId || !currentUser) return;
        try {
            const token = await currentUser.getIdToken();
            const data = await getMessages(convoId, token);

            setMessages(prev => {
                const existingIds = new Set(prev.map(msg => msg.id));
                const newMessages = data.filter(msg => !existingIds.has(msg.id));
                return [...prev, ...newMessages].sort((a, b) => (a.timestamp._seconds || 0) - (b.timestamp._seconds || 0));
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
        if (pollingInterval.current) clearInterval(pollingInterval.current);
        pollingInterval.current = setInterval(fetchMessages, 3000);
        return () => clearInterval(pollingInterval.current);
    }, [convoId, currentUser]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!text.trim()) return;
        const newMsgText = text.trim();
        setText("");

        const tempMsg = {
            id: `temp-${Date.now()}`,
            senderId: currentUser.uid,
            senderEmail: currentUser.email,
            text: newMsgText,
            timestamp: { _seconds: Math.floor(Date.now() / 1000) },
        };
        setMessages(prev => [...prev, tempMsg]);

        try {
            const data = await sendMessage(convoId, newMsgText, currentUser.accessToken);

            setMessages(prev => {
                const filtered = prev.filter(msg => msg.id !== tempMsg.id);
                return [...filtered, { id: data.id, senderId: currentUser.uid, senderEmail: currentUser.email, text: newMsgText, timestamp: { _seconds: Math.floor(Date.now() / 1000) } }];
            });
        } catch (err) {
            console.error("Failed to send message:", err);
        }
    };

    if (loading) return <p className="loading">Loading messages...</p>;
    if (!messages.length) return <p className="no-messages">No messages yet. Say hi!</p>;

    return (
        <div className="chat-container">
            <div className="messages-list">
                {messages.map(msg => (
                    <div
                        key={msg.id}
                        className={`message-item ${msg.senderId === currentUser.uid ? "sent" : "received"}`}
                    >
                        <div className="message-bubble">
                            <span className="sender">{msg.senderId === currentUser.uid ? "You" : msg.senderEmail }</span>
                            <p className="message-text">{msg.text}</p>
                            <small className="timestamp">
                                {new Date((msg.timestamp._seconds || 0) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </small>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="input-container">
                <input
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Type a message..."
                    onKeyDown={e => e.key === "Enter" && handleSend()}
                />
                <button className="send-button" onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}
