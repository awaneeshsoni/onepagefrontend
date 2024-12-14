import React, { useEffect, useState } from "react";
import messageService from "../services/messageService";
import Message from "../components/Message";
import "../App.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await messageService.getMessages(); // Replace with your service call to fetch all messages
        setMessages(res.data.messages);
      } catch (error) {
        alert("Error fetching messages!");
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMessages();
  }, []);

  const handleDeleteMessage = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message._id !== messageId)
    );
  };
   
  return (
    <div className="messages-page">
      <h2>All Messages</h2>
      {loading && <div className="loader"></div>}
      <div className="message-cards">
        {messages?.map((msg) => (
          <Message key={msg._id} id={msg._id} message={msg.message} page={msg.page} onDelete={handleDeleteMessage} />
        ))}
      </div>
    </div>
  );
};

export default Messages;
