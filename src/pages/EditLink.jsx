import React, { useEffect, useState } from "react";
import linkService from "../services/linkService";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css"

export default function EditLink() {
  const { slug } = useParams();
  const [title,setTitle] = useState("")
  const [url,setUrl] = useState("");
  const navigate = useNavigate();
  const [loading , setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const getLink = await linkService.getLink(slug);
        setTitle(getLink.data.title);
        setUrl(getLink.data.url);
        console.log(getLink);
      } catch (error) {
        console.error("Error fetching link:", error.message);
      }
      finally{
        setLoading(false)
      }
    };
    fetchLinks();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await linkService.editLink({ title, url, slug });
      //alert("Link added successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("error editing link!")
      console.error("Error adding link:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit link</h2>
      {loading && <div className="loader"></div>}
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
      <button type="submit">Update link</button>
    </form>
  );
}
