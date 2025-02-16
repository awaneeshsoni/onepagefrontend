import React, { useEffect, useState } from "react";
import messageService from "../services/messageService";
import Message from "../components/Message";
import { FaSpinner } from 'react-icons/fa';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await messageService.getMessages();
        setMessages(res.data.messages || []); // Ensure messages is an array
      } catch (error) {
        console.error("Error:", error.message);
        // Consider a user-friendly error message state
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleDeleteMessage = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message._id !== messageId)
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow px-4 py-12 mx-auto max-w-3xl sm:px-6 lg:px-8">
        <h2 className="mb-8 text-3xl font-extrabold text-center text-gray-800">
          All Messages
        </h2>
        {loading ? (
          <div className="flex items-center justify-center">
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
          <p className="text-center text-gray-600">No messages found.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Messages;