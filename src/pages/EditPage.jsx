import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pageService from "../services/pageService";
import linkService from "../services/linkService";

const EditPage = () => {
  const { slug } = useParams();  // Get the page slug from the URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [links, setLinks] = useState([]);
  const [selectedLinks, setSelectedLinks] = useState([]);

  useEffect(() => {
    // Fetch the page data by slug
    const fetchPageData = async () => {
      try {
        const page = await pageService.getPage(slug);
        setTitle(page.data.title);
        setNewSlug(page.data.slug);
        setSelectedLinks(page.data.links.map((link) => link._id));  // Pre-select current links
      } catch (error) {
        console.error("Error fetching page data:", error.message);
      }
    };

    // Fetch all user links
    const fetchLinks = async () => {
      try {
        const userLinks = await linkService.getLinks();
        setLinks(userLinks.data);
      } catch (error) {
        console.error("Error fetching links:", error.message);
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
    console.log(selectedLinks)
    try {
      // Send the updated page data to the backend
      const edit = await pageService.editPage({ title, slug, newSlug, links: selectedLinks });
      alert("Page updated successfully!");
      navigate(`/dashboard`);  // Navigate to the updated page
    } catch (error) {
      console.error("Error updating page:", error.message);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this page?");
    if (confirmDelete) {
      try {
        const response = await pageService.deletePage(slug);
        alert("Page deleted successfully!");
        navigate("/dashboard"); // Navigate back to dashboard or homepage after deletion
      } catch (error) {
        console.error("Error deleting page:", error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Your Page</h2>
      <input
        type="text"
        placeholder="Page Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="domian of page"
        value={newSlug}
        onChange={(e) => setNewSlug(e.target.value)}
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
      <button type="submit">Update Page</button>
      <button type="button" onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>
        Delete Page
      </button>
    </form>
  );
};

export default EditPage;
