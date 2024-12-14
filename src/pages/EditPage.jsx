import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pageService from "../services/pageService";
import linkService from "../services/linkService";

const EditPage = () => {
  const { slug } = useParams(); // Get the page slug from the URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  const [newSlug, setNewSlug] = useState("");
  const [links, setLinks] = useState([]);
  const [selectedLinks, setSelectedLinks] = useState([]);
  const [allowMessages, setAllowMessages] = useState();
  const [linkLoading, setLinkLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // Fetch the page data by slug
    const fetchPageData = async () => {
      try {
        const page = await pageService.getPage(slug);
        setTitle(page.data.title);
        setDescription(page.data.description)
        setNewSlug(page.data.slug);
        setAllowMessages(page.data.allowAnonymousMessages)
        setSelectedLinks(page.data.links.map((link) => link._id));
        console.log(page.data) // Pre-select current links
      } catch (error) {
        console.error("Error fetching page data:", error.message);
      } finally {
        setPageLoading(false);
      }
    };

    // Fetch all user links
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
    console.log(selectedLinks);
    try {
      // Send the updated page data to the backend
      const edit = await pageService.editPage({
        title,
        description,
        slug,
        newSlug,
        links: selectedLinks,
        allowAnonymousMessages: allowMessages,
      });
      alert("Page updated successfully!");
      navigate(`/dashboard`); // Navigate to the updated page
    } catch (error) {
      alert("error updating page")
      console.error("Error updating page:", error.message);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this page?"
    );
    if (confirmDelete) {
      try {
        const response = await pageService.deletePage(slug);
        alert("Page deleted successfully!");
        navigate("/dashboard"); // Navigate back to dashboard or homepage after deletion
      } catch (error) {
        alert("Error deleting Page")
        console.error("Error deleting page:", error.message);
      }
    }
  };
  const handleSlugChange = (e) => {
    const value = e.target.value;

    // Allow only alphanumeric characters and dashes, convert to lowercase
    const sanitizedSlug = value.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();

    setNewSlug(sanitizedSlug);
  };

  const handleSlugKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault(); // Block the space key
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Your Page</h2>
      {pageLoading && <div className="loader"></div>}
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
        onChange={handleSlugChange}
        onKeyDown={handleSlugKeyDown}
        required
      />
      <input
        type="text"
        value={description}
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
      {linkLoading && <div className="loader"></div>}
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
      <button
        type="button"
        onClick={handleDelete}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Delete Page
      </button>
    </form>
  );
};

export default EditPage;
