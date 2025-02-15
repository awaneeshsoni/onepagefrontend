import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pageService from "../services/pageService";
import messageService from "../services/messageService";
import "../App.css"; // Consider removing or modifying
import { FaSpinner } from 'react-icons/fa';
import { FaPaperPlane } from 'react-icons/fa'; // Import a send icon

const PublicPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null); // Initialize as null
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false); // Loading state for message submission

  useEffect(() => {
    async function fetchPage() {
      try {
        const fetchedPage = await pageService.getPage(slug);
        setPage(fetchedPage.data);
      } catch (error) {
        console.error("Error fetching page:", error.message);
        // Consider showing an error message to the user (e.g., using a state variable)
      } finally {
        setLoading(false);
      }
    }
    fetchPage();
  }, [slug]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true); // Set loading to true when submitting
    try {
      const res = await messageService.addMessage({ message: newMessage, slug });
      if (res) {
        alert("Message sent!");
        setNewMessage("");
      } else {
        alert("Error sending message");
        console.error("Error posting message");
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
      alert("Error sending message");
    } finally {
      setSubmitLoading(false); // Set loading back to false after request
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <FaSpinner className="animate-spin text-orange-500" size={48} />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Page not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-lg shadow-lg p-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            {page.title}
          </h1>
          <p className="text-gray-600 text-center mt-2">
            {page.description}
          </p>
        </div>
        <div className="space-y-4">
          {page.links?.map((link) => (
            <a
              key={link._id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-6 bg-gray-800 text-white rounded-full text-center font-semibold hover:bg-gray-700 transition duration-300 shadow-md"
            >
              {link.title}
            </a>
          ))}
        </div>
        {page.allowAnonymousMessages && (
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              Leave a Message
            </h4>
            <form onSubmit={handleMessageSubmit} className="space-y-4">
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  rows={4}
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                   {submitLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" /> {/* Send icon */}
                      Send
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
        <p className="mt-8 text-center text-gray-500 text-sm">
          Made with{" "}
          <a
            href="https://inonepage.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-600 font-semibold"
          >
            OnePage
          </a>
        </p>
      </div>
    </div>
  );
};

export default PublicPage;