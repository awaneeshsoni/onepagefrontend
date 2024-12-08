import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ShowPage(props) {
  const navigate = useNavigate();

  function handleEditClick(){
    navigate(`/pages/${props.page.slug}`)
  }
  return (
    <div>
      <h3>{props.page.title}</h3>
      <a
        href={`/${props.page.slug}`}
        target="_blank"
        rel="noopener noreferrer"
      >Visit: {`${props.page.slug}`}</a>
      <button onClick={handleEditClick}>Edit Page</button>
      <ul>
        Links:
      {props.page.links?.map((link) => (
          <li>
        <div key={link._id}>
          <p>{link.title}</p>
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.url}
          </a>
        </div>
        </li>
      ))}
      </ul>
    </div>
  );
}
