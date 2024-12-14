import React, { useEffect, useState } from "react";
import linkService from "../services/linkService";
import { ShowLink } from "../components/Link";
import { Link } from "react-router-dom";
import pageService from "../services/pageService";
import ShowPage from "../components/Page";
import "../App.css";
import messageService from "../services/messageService";
import Message from "../components/Message";

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [pages, setPages] = useState([]);
  const [messages, setMessages] = useState({});
  const [messLoading, setMessLoading] = useState(true);
  const [linkLoading, setLinkLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
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
    const fetchPages = async () => {
      try {
        const userPages = await pageService.getUserPages();
        setPages(userPages.data);
      } catch (error) {
        console.error("Error fetching Pages:", error.message);
      } finally {
        setPageLoading(false);
      }
    };
    const fetchMess = async () => {
      try {
        const userMess = await messageService.getMessages();
        setMessages(userMess.data.messages);
      } catch (error) {
        console.error("Error fetching Pages:", error.message);
      } finally {
        setMessLoading(false);
      }
    };
    fetchMess();
    fetchLinks();
    fetchPages();
  }, []);

  const handleDeleteLink = (id) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link._id !== id));
  };

  const handleDeleteMessage = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message._id !== messageId)
    );
  };
  return (
    <div className="container">
      <div className="container">
        <div>
        <h4>Messages</h4>
        <Link to="/messages" className="show-more-link">
            Show More
          </Link>
        {messages && messages.length > 0 ? (
          messages.slice(0, 3).map((msg) => (
            <Message key={msg._id} id={msg._id} message={msg.message} page={msg.page} onDelete={handleDeleteMessage} />
          ))
        ) : (
          <p>No messages yet.</p>
        )}
        </div>
      </div>
      <div>
        <div className="addpageline">
          <h2>Your Pages</h2>
          <Link to={"/create-page"}>Add Page</Link>
        </div>
        {linkLoading && <div className="loader"></div>}
        {pages.map((page) => (
          <>
            <ShowPage key={page._id} page={page} />
            <hr></hr>
          </>
        ))}
      </div>
      <div>
        <div className="addlinkline">
          <h2>Your Links</h2>
          <Link to={"/create-link"}>Add Link</Link>
        </div>
        {pageLoading && <div className="loader"></div>}
        {links.map((link) => (
          <>
            <ShowLink key={link._id} link={link} onDelete={handleDeleteLink} />
            <hr></hr>
          </>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
