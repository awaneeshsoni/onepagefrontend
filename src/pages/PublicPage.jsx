import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pageService from "../services/pageService";
import messageService from "../services/messageService";
import { FaSpinner } from 'react-icons/fa';
import { FaPaperPlane } from 'react-icons/fa';

const PublicPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const fetchedPage = await pageService.getPage(slug);
        setPage(fetchedPage.data);
      } catch (error) {
        console.error("Error fetching page:", error.message);
        // Consider a user-friendly error message state
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [slug]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const res = await messageService.addMessage({ message: newMessage, slug });
      if (res) {
        // Consider using a more robust notification system (e.g., a toast)
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
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <FaSpinner className="animate-spin text-orange-500" size={48} />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Page not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">{page.title}</h1>
          <p className="mt-2 text-gray-600">{page.description}</p>
        </div>
        <div className="space-y-4">
          {page.links?.map((link) => (
            <a
              key={link._id}
              href={link.url.startsWith("http") ? link.url : `https://${link.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-3 text-center text-white bg-gray-800 rounded-full font-semibold transition duration-300 hover:bg-gray-700 shadow-md"
            >
              {link.title}
            </a>
          ))}
        </div>
        {page.allowAnonymousMessages && (
          <div className="mt-8">
            <h4 className="mb-2 text-lg font-semibold text-gray-700">
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
                  className="block w-full px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md appearance-none text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  rows={4}
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md group hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Send
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
        <p className="mt-8 text-sm text-center text-gray-500">
          Made with{" "}
          <a
            href="https://inonepage.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-orange-500 hover:text-orange-600"
          >
            OnePage
          </a>
        </p>
      </div>
    </div>
  );
};

export default PublicPage;