import React, { useState, useEffect } from "react";
import linkService from "../services/linkService";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css"; // Consider removing or modifying
import { FaSpinner } from 'react-icons/fa';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function EditLink() {
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false); // Separate loading state for submission

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const getLink = await linkService.getLink(slug);
        setTitle(getLink.data.title);
        setUrl(getLink.data.url);
      } catch (error) {
        console.error("Error fetching link:", error.message);
        // Consider showing an error message to the user (e.g., using a state variable)
      } finally {
        setLoading(false);
      }
    };
    fetchLink();
  }, [slug]); // Add slug to the dependency array

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true); // Set submitLoading to true when submitting
    try {
      await linkService.editLink({ title, url, slug });
      navigate("/dashboard");
    } catch (error) {
      alert("Error editing link!");
      console.error("Error adding link:", error.message);
    } finally {
      setSubmitLoading(false); // Set submitLoading back to false after the request
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="max-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white rounded-lg shadow-md p-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800">
              Edit Link
            </h2>
          </div>
          {loading ? (
            <div className="text-center">
              <FaSpinner className="animate-spin text-orange-500" size={24} />
            </div>
          ) : (
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
                  type="url"
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
                  disabled={submitLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    "Update Link"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}