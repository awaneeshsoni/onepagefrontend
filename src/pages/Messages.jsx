import React, { useEffect, useState } from "react";
import messageService from "../services/messageService";
import Message from "../components/Message";
import "../App.css"; // Consider removing or modifying
import { FaSpinner } from 'react-icons/fa';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await messageService.getMessages();
        setMessages(res.data.messages || []); // Ensure messages is an array
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
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
          All Messages
        </h2>
        {loading ? (
          <div className="text-center">
            <FaSpinner className="animate-spin text-orange-500" size={24} />
          </div>
        ) : messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((msg) => (
              <Message
                key={msg._id}
                id={msg._id}
                message={msg.message}
                page={msg.page}
                onDelete={handleDeleteMessage}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No messages found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Messages;