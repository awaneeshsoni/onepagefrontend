import React, { useEffect, useState } from "react";
import linkService from "../services/linkService";
import { ShowLink } from "../components/Link";
import { Link } from "react-router-dom";
import pageService from "../services/pageService";
import ShowPage from "../components/Page";
import messageService from "../services/messageService";
import Message from "../components/Message";
import { FaSpinner } from 'react-icons/fa';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [links, setLinks] = useState(null); // Initialize to null
  const [pages, setPages] = useState(null); // Initialize to null
  const [messages, setMessages] = useState(null); // Initialize to null
  const [messLoading, setMessLoading] = useState(true);
  const [linkLoading, setLinkLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null); // Add an error state

  useEffect(() => {
    const fetchData = async () => {
      setMessLoading(true);
      setLinkLoading(true);
      setPageLoading(true);
      setError(null); // Clear any previous errors

      try {
        const [userLinks, userPages, userMess] = await Promise.all([
          linkService.getLinks(),
          pageService.getUserPages(),
          messageService.getMessages(),
        ]);

        setLinks(userLinks.data);
        setPages(userPages.data);
        setMessages(userMess.data.messages || []);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError("Failed to load data. Please try again later."); // Set error message
      } finally {
        setMessLoading(false);
        setLinkLoading(false);
        setPageLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteLink = (id) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link._id !== id));
  };

  const handleDeleteMessage = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message._id !== messageId)
    );
  };

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-grow p-8 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow p-8">
        <div className="grid max-w-7xl grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
          {/* Messages Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="mb-4 text-2xl font-semibold text-center text-gray-800">
              Messages
            </h4>
            {messLoading ? (
              <div className="flex items-center justify-center">
                <FaSpinner className="animate-spin text-orange-500" size={24} />
              </div>
            ) : messages === null ? ( // Check for null
              <p className="text-gray-600">Loading messages...</p>
            ) : messages.length > 0 ? (
              messages.slice(0, 3).map((msg) => (
                <Message
                  key={msg._id}
                  id={msg._id}
                  message={msg.message}
                  page={msg.page}
                  onDelete={handleDeleteMessage}
                />
              ))
            ) : (
              <p className="text-gray-600">No messages yet.</p>
            )}
            <div className="mt-4 text-center">
              <Link
                to="/messages"
                className="inline-block px-4 py-2 text-sm font-semibold text-white transition duration-200 bg-orange-500 rounded-full hover:bg-orange-600"
              >
                Show More
              </Link>
            </div>
          </div>

          {/* Pages Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Your Pages</h2>
              <Link
                to="/create-page"
                className="inline-block px-4 py-2 text-sm font-semibold text-white transition duration-200 bg-orange-500 rounded-full hover:bg-orange-600"
              >
                Add Page
              </Link>
            </div>
            {pageLoading ? (
              <div className="flex items-center justify-center">
                <FaSpinner className="animate-spin text-orange-500" size={24} />
              </div>
            ) : pages === null ? ( // Check for null
              <p className="text-gray-600">Loading pages...</p>
            ) : pages.length > 0 ? (
              <div className="space-y-4">
                {pages.map((page) => (
                  <ShowPage key={page._id} page={page} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No pages created</p>
            )}
          </div>

          {/* Links Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Your Links</h2>
              <Link
                to="/create-link"
                className="inline-block px-4 py-2 text-sm font-semibold text-white transition duration-200 bg-orange-500 rounded-full hover:bg-orange-600"
              >
                Add Link
              </Link>
            </div>
            {linkLoading ? (
              <div className="flex items-center justify-center">
                <FaSpinner className="animate-spin text-orange-500" size={24} />
              </div>
            ) : links === null ? (  // Check for null
              <p className="text-gray-600">Loading links...</p>
            ) : links.length > 0 ? (
              <div className="space-y-4">
                {links.map((link) => (
                  <ShowLink
                    key={link._id}
                    link={link}
                    onDelete={handleDeleteLink}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No Links created</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;