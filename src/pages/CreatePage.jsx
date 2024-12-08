import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import linkService from "../services/linkService";
import pageService from "../services/pageService";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [links, setLinks] = useState([]);
  const [selectedLinks, setSelectedLinks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const userLinks = await linkService.getLinks();
        setLinks(userLinks.data);
      } catch (error) {
        console.error("Error fetching links:", error.message);
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
      await pageService.createPage({ title, slug, links: selectedLinks });
      alert("Page created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating page:", error.message);
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
        placeholder="Page Slug (e.g., your-name)"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        required
      />
      <h3>Select Links to Add</h3>
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
