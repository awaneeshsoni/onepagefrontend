import React from "react";
import { Link, useNavigate } from "react-router-dom";
import linkService from "../services/linkService";

export function ShowLink(props) {
  const navigate = useNavigate()
  const handleDelete = async () => {
    try {
      const result = await linkService.deleteLink(props.link._id);
      props.onDelete(props.link._id)
      //alert("Link added successfully!");
      console.log(result)
    } catch (error) {
      console.error("Error deleting link:", error.message);
    }
  };
  return (
    <div>
      <div key={props.link._id}>
        <p>Title: {props.link.title}</p>
        <div>
        <p>Url: {props.link.url}</p>
        <a href={props.link.url} target="_blank" rel="noopener noreferrer">Visit</a>
        <br></br>
        <a href={`/links/${props.link._id}`}>Edit</a>
        <button onClick={handleDelete} >Delete</button>
        
        </div>
      </div>
    </div>
  );
}

export function AddLink(){
  return(
    <div>

    </div>
  )
}