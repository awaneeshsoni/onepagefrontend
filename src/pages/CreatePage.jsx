import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import linkService from "../services/linkService";
import pageService from "../services/pageService";
import "../App.css"; // Consider removing or modifying this
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const userLinks = await linkService.getLinks();
        setLinks(userLinks.data);
      } catch (error) {
        console.error("Error fetching links:", error.message);
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
    setLoading(true); // Set loading to true when submitting
    try {
      await pageService.createPage({
        title,
        description,
        slug,
        links: selectedLinks,
        allowAnonymousMessages: allowMessages,
      });
      alert("Page created successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("error creating page");
      console.error("Error creating page:", error.message);
    } finally {
      setLoading(false);
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
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8" >
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white rounded-lg shadow-md p-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800">
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
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
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
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
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
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="flex items-center">
              <input
                id="allow-messages"
                type="checkbox"
                checked={allowMessages}
                onChange={() => setAllowMessages((prev) => !prev)}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label
                htmlFor="allow-messages"
                className="ml-2 block text-sm text-gray-900"
              >
                Allow Anonymous Messaging
              </label>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700">
                Select Links to Add
              </h3>
              {loading ? (
                <div className="text-center">
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
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`link-${link._id}`}
                        className="ml-2 block text-sm text-gray-900"
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
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <FaSpinner className="animate-spin" /> // Show spinner
                ) : (
                  "Create Page" // Show "Login" text
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePage;