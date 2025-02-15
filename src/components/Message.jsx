import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Consider removing or modifying
import messageService from "../services/messageService";

const Message = ({ id, message, page, onDelete }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    ); // Add confirmation
    if (confirmDelete) {
      try {
        await messageService.deleteMessage(id);
        if (onDelete) {
          onDelete(id);
        }
      } catch (error) {
        console.error("Error deleting message:", error);
        alert("Failed to delete message.");
      }
    }
  };

  // Format the date (more robustly)
  const formatDate = (dateString) => {
    try{
      const date = new Date(dateString);
      // Check if the date is valid
        if (isNaN(date.getTime())) {
            return "Invalid Date";
          }
      return date.toLocaleString(); // Or use a custom format with toLocaleDateString and toLocaleTimeString
    }
    catch(error){
      return "Invalid Date";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <p className="text-gray-800 mb-2">
        <span className="font-semibold">Message:</span> {message}
      </p>

      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Page:</span>{" "}
        <Link
          to={`/pages/${page.slug}`}
          className="text-orange-500 hover:text-orange-600"
        >
          {page.title}
        </Link>
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Posted at:</span> {formatDate(message.createdAt)}
      </p>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-200 text-sm font-semibold"
      >
        Delete
      </button>
    </div>
  );
};

export default Message;