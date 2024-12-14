import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import linkService from "../services/linkService";
import pageService from "../services/pageService";
import "../App.css";

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
    }
  };
  const handleSlugChange = (e) => {
    const value = e.target.value;

    // Allow only alphanumeric characters and dashes, convert to lowercase
    const sanitizedSlug = value.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();

    setSlug(sanitizedSlug);
  };

  const handleSlugKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault(); // Block the space key
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Your Page</h2>
      <input
        type="text"
        placeholder="Page Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="domain of page"
        value={slug}
        onChange={handleSlugChange}
        onKeyDown={handleSlugKeyDown}
        required
      />
      <input
        type="text"
        value={slug}
        onChange={(e) => setDescription(e.target.value)}
        maxLength="140" // Limit input to 140 characters
        placeholder="Enter a short description"
        rows="3"
        required
      />
      <div>
          <label>
            <input
              type="checkbox"
              checked={allowMessages}
              onChange={() => setAllowMessages((prev) => !prev)}
            />
            Allow Anonymous Messaging
          </label>
          </div>
      <h3>Select Links to Add</h3>
      {loading && <div className="loader"></div>}
      {links.map((link) => (
        <div key={link._id}>
          <input
            type="checkbox"
            checked={selectedLinks.includes(link._id)}
            onChange={() => handleCheckboxChange(link._id)}
          />
          <label>{link.title}</label>
        </div>
      ))}
      <button type="submit">Create Page</button>
    </form>
  );
};

export default CreatePage;
