import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pageService from "../services/pageService";

const PublicPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState({});

  useEffect(() => {
    async function fetchPage(){
      try {
        const fetchedPage = await pageService.getPage(slug)
        setPage(fetchedPage.data);
      } catch (error) {
        console.error("Error fetching page:", error.message);
      }
    };
    fetchPage();
  }, []);
  
  return (
    <div>
      {page ? (
        <div>
          <h1>{page.title}</h1>
          {page.links?.map((link) => (
            <div key={link._id}>
              <p>{link.title}</p>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.url}
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>looks like you forgot to get the full url</p>
      )}
    </div>
  );
};

export default PublicPage;
