import React, { useState } from "react";
import linkService from "../services/linkService";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from 'react-icons/fa';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CreateLink = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    try {
      await linkService.addLink({ title, url });
      navigate('/dashboard');
    } catch (error) {
      alert("Error creating link!");
      console.error("Error adding link:", error.message);
    } finally {
      setLoading(false); // Set loading back to false after request completes
    }
  };

  return (
    <div className="bg-gray-100 max-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="max-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-2">
        <div className="max-w-md w-full space-y-8 bg-white rounded-lg shadow-md p-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800">
              Add a New Link
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="link-title" className="sr-only">
                Link Title
              </label>
              <input
                id="link-title"
                type="text"
                placeholder="Link Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="link-url" className="sr-only">
                Link URL
              </label>
              <input
                id="link-url"
                type="url" // Use type="url" for URL inputs
                placeholder="Link URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  "Add Link"
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

export default CreateLink;