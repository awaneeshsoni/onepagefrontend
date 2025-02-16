import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pageService from "../services/pageService";
import linkService from "../services/linkService";
import { FaSpinner } from 'react-icons/fa';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const EditPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [links, setLinks] = useState([]);
  const [selectedLinks, setSelectedLinks] = useState([]);
  const [allowMessages, setAllowMessages] = useState(true);
  const [linkLoading, setLinkLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const page = await pageService.getPage(slug);
        setTitle(page.data.title);
        setDescription(page.data.description);
        setNewSlug(page.data.slug);
        setAllowMessages(page.data.allowAnonymousMessages);
        setSelectedLinks(page.data.links.map((link) => link._id));
      } catch (error) {
        console.error("Error fetching page data:", error.message);
        // Consider a user-friendly error message state
      } finally {
        setPageLoading(false);
      }
    };

    const fetchLinks = async () => {
      try {
        const userLinks = await linkService.getLinks();
        setLinks(userLinks.data);
      } catch (error) {
        console.error("Error fetching links:", error.message);
      } finally {
        setLinkLoading(false);
      }
    };

    fetchPageData();
    fetchLinks();
  }, [slug]);

  const handleCheckboxChange = (linkId) => {
    setSelectedLinks((prevSelected) =>
      prevSelected.includes(linkId)
        ? prevSelected.filter((id) => id !== linkId)
        : [...prevSelected, linkId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      await pageService.editPage({
        title,
        description,
        slug,
        newSlug,
        links: selectedLinks,
        allowAnonymousMessages: allowMessages,
      });
      alert("Page updated successfully!"); // Consider a more robust notification
      navigate(`/dashboard`);
    } catch (error) {
      alert("Error updating page");
      console.error("Error updating page:", error.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this page?"
    );
    if (confirmDelete) {
      try {
        await pageService.deletePage(slug);
        alert("Page deleted successfully!");
        navigate("/dashboard");
      } catch (error) {
        alert("Error deleting Page");
        console.error("Error deleting page:", error.message);
      }
    }
  };

  const handleSlugChange = (e) => {
    const value = e.target.value;
    const sanitizedSlug = value.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
    setNewSlug(sanitizedSlug);
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
                Edit Your Page
              </h2>
            </div>
            {pageLoading ? (
              <div className="flex items-center justify-center">
                <FaSpinner className="animate-spin text-orange-500" size={24} />
              </div>
            ) : (
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
                    value={newSlug}
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
                  {linkLoading ? (
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
                      "Update Page"
                    )}
                  </button>
                </div>
              </form>
            )}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete Page
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditPage;