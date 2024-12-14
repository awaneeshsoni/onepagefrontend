import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import messageService from "../services/messageService";




const Message = ({ id, message, page, onDelete }) => {
    const handleDelete = async () => {
      try {
        // Call the service to delete the message by its ID
        const res = await messageService.deleteMessage(id)
        if (onDelete) {
          onDelete(id);
        }
      } catch (error) {
        console.error("Error deleting message:", error);
        alert("Failed to delete message.");
      }
    };
    
  return (
    <div
      className="message-card"
      style={{
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        padding: "15px",
        margin: "10px 0",
        borderRadius: "8px",
      }}
    >
      <p>
        <strong>Message:</strong> {message}
      </p>

      {/* Link the page title to the edit page using the slug */}
      <p>
        <strong>Page:</strong>
        <Link
          to={`/pages/${page.slug}`}
          style={{ textDecoration: "none", color: "blue" }}
        >
          {page.title}
        </Link>
      </p>
      <p>
        <strong>Posted at:</strong> {Date(message.createdAt)}
      </p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Message;
