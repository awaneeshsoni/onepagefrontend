import React, { useState } from "react";
import pageService from "../services/pageService";
import linkService from "../services/linkService";
import { useNavigate } from "react-router-dom";

const CreateLink = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await linkService.addLink({ title, url });
    //   alert("Link added successfully!");
      navigate('/dashboard');
    } catch (error) {
      alert("Error creating link!")
      console.error("Error adding link:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a new link</h2>
      <input
        type="text"
        placeholder="Link Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Link url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button type="submit">Add link</button>
    </form>
  );
};

export default CreateLink;
