import React, { useEffect, useState } from "react";
import linkService from "../services/linkService";
import { ShowLink } from "../components/Link";
import { Link } from "react-router-dom";
import pageService from "../services/pageService";
import ShowPage from "../components/Page";
import "../App.css"

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const userLinks = await linkService.getLinks();
        setLinks(userLinks.data);
      } catch (error) {
        console.error("Error fetching links:", error.message);
      }
    };
    const fetchPages = async () => {
      try {
        const userPages = await pageService.getUserPages();
        setPages(userPages.data);
      } catch (error) {
        console.error("Error fetching Pages:", error.message);
      }
    };
    fetchLinks();
    fetchPages();
  }, []);

  const handleDeleteLink = (id) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link._id !== id));
  };

  return (
    <div className="container">
      <div>
        <div className="addpageline">
        <h2>Your Pages</h2>
        <Link to={"/create-page"}>Add Page</Link>
        </div>
        {pages.map((page) => (
          <>
          <ShowPage key={page._id} page={page} /><hr></hr>
          </>
        ))}
      </div>
      <div >
        <div  className="addlinkline">
        <h2>Your Links</h2>
        <Link to={"/create-link"}>Add Link</Link>
        </div>
        {links.map((link) => (
          <><ShowLink key={link._id} link={link} onDelete={handleDeleteLink} /><hr></hr></>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
