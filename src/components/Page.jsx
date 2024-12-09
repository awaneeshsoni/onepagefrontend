import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"

export default function ShowPage(props) {
  const navigate = useNavigate();

  function handleEditClick(){
    navigate(`/pages/${props.page.slug}`)
  }
  return (
    <div className="pagecompocontainer">
      <h3>{props.page.title}</h3>
      <a
        href={`/${props.page.slug}`}
        target="_blank"
        rel="noopener noreferrer"
      >Visit</a>
      <button onClick={handleEditClick}>Edit Page</button>
    </div>
  );
}
