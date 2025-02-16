import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import linkService from "../services/linkService";
import pageService from "../services/pageService";
import { FaSpinner } from 'react-icons/fa';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [links, setLinks] = useState([]);
  const [selectedLinks, setSelectedLinks] = useState([]);
  const [allowMessages, setAllowMessages] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false); // Separate loading state
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const userLinks = await linkService.getLinks();
        setLinks(userLinks.data);
      } catch (error) {
        console.error("Error fetching links:", error.message);
        // Consider a user-friendly error message state
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  const handleCheckboxChange = (linkId) => {
    setSelectedLinks((prevSelected) =>
      prevSelected.includes(linkId)
        ? prevSelected.filter((id) => id !== linkId)
        : [...prevSelected, linkId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true); // Set loading state before submitting
    try {
      await pageService.createPage({
        title,
        description,
        slug,
        links: selectedLinks,
        allowAnonymousMessages: allowMessages,
      });
      alert("Page created successfully!"); // Consider a more robust notification
      navigate("/dashboard");
    } catch (error) {
      alert("error creating page");
      console.error("Error creating page:", error.message);
    } finally {
      setSubmitLoading(false); // Reset loading state after request
    }
  };

  const handleSlugChange = (e) => {
    const value = e.target.value;
    const sanitizedSlug = value.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
    setSlug(sanitizedSlug);
  };

  const handleSlugKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow">
        <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-800">
                Create Your Page
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="page-title" className="sr-only">
                  Page Title
                </label>
                <input
                  id="page-title"
                  type="text"
                  placeholder="Page Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="page-slug" className="sr-only">
                  Page Slug
                </label>
                <input
                  id="page-slug"
                  type="text"
                  placeholder="Page Slug (unique URL)"
                  value={slug}
                  onChange={handleSlugChange}
                  onKeyDown={handleSlugKeyDown}
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="page-description" className="sr-only">
                  Description
                </label>
                <textarea
                  id="page-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={140}
                  placeholder="Enter a short description (max 140 characters)"
                  rows={3}
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="allow-messages"
                  type="checkbox"
                  checked={allowMessages}
                  onChange={() => setAllowMessages((prev) => !prev)}
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <label
                  htmlFor="allow-messages"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Allow Anonymous Messaging
                </label>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700">
                  Select Links to Add
                </h3>
                {loading ? (
                  <div className="flex items-center justify-center">
                    <FaSpinner className="animate-spin text-orange-500" size={24} />
                  </div>
                ) : links.length > 0 ? (
                  <div className="mt-2 space-y-2">
                    {links.map((link) => (
                      <div key={link._id} className="flex items-center">
                        <input
                          id={`link-${link._id}`}
                          type="checkbox"
                          checked={selectedLinks.includes(link._id)}
                          onChange={() => handleCheckboxChange(link._id)}
                          className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label
                          htmlFor={`link-${link._id}`}
                          className="block ml-2 text-sm text-gray-900"
                        >
                          {link.title}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-gray-600">No Links created</p>}
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
                    "Create Page"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreatePage;