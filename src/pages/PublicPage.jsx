import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pageService from "../services/pageService";
import "../App.css";
import messageService from "../services/messageService";

const PublicPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPage() {
      try {
        const fetchedPage = await pageService.getPage(slug);
        setPage(fetchedPage.data);
      } catch (error) {
        alert("Error fetching page!");
        console.error("Error fetching page:", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPage();
  }, [slug]); // Add 'slug' as a dependency to rerun the effect if it changes.

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await messageService.addMessage({ message: newMessage, slug });
      if (res) {
        alert("Message sent!");
        setNewMessage(""); // Clear the message input after submitting
      } else {
        alert("Error sending message");
        console.error("Error posting message");
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
      alert("Error sending message");
    }
  };

  return (
    <div>
      {loading && <div className="loader"></div>}
      {page && (
        <div>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
          {page.links?.map((link) => (
            <div key={link._id}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
              <hr />
            </div>
          ))}
          <div className="messageContainer">
            <div>
              <h4>Leave a message</h4>
              <form onSubmit={handleMessageSubmit}>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message"
                  required
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      )}
      <p>
        made with <a href="https://inonepage.vercel.app">OnePage</a>
      </p>
    </div>
  );
};

export default PublicPage;
