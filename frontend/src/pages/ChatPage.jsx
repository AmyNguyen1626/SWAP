import { useState } from "react";
import ConversationsList from "../components/ConversationList";
import Message from "../components/Message";
import "./ChatPage.css";

export default function ChatPage() {
  const [selectedConvo, setSelectedConvo] = useState(null);

  return (
    <div className="chat-page">
      <div className="chat-sidebar">
        <ConversationsList onSelectConversation={setSelectedConvo} />
      </div>
      <div className="chat-content">
        {selectedConvo ? (
          <Message convoId={selectedConvo} />
        ) : (
          <p className="chat-placeholder">Select a conversation to start chatting</p>
        )}
      </div>
    </div>
  );
}
