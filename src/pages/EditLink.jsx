import React, { useState, useEffect } from "react";
import linkService from "../services/linkService";
import { useNavigate, useParams } from "react-router-dom";
import { FaSpinner } from 'react-icons/fa';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function EditLink() {
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const getLink = await linkService.getLink(slug);
        setTitle(getLink.data.title);
        setUrl(getLink.data.url);
      } catch (error) {
        console.error("Error fetching link:", error.message);
        // Consider a user-friendly error message state
      } finally {
        setLoading(false);
      }
    };
    fetchLink();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      await linkService.editLink({ title, url, slug });
      navigate("/dashboard");
    } catch (error) {
      alert("Error editing link!"); // Consider a more robust notification
      console.error("Error adding link:", error.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex items-center justify-center flex-grow px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800">
              Edit Link
            </h2>
          </div>
          {loading ? (
            <div className="flex items-center justify-center">
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
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
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
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
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
                    "Update Link"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}