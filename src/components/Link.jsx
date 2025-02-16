import React from "react";
import { Link, useNavigate } from "react-router-dom";
import linkService from "../services/linkService";
import "../App.css"; // You'll likely want to remove or modify this

export function ShowLink(props) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await linkService.deleteLink(props.link._id);
      props.onDelete(props.link._id);
    } catch (error){
      console.error("Error deleting link:", error.message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-800">{props.link.title}</p>
        <div className="space-x-2">
          <a
            href={props.link.url.startsWith("http") ? props.link.url : `https://${props.link.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition duration-200 text-sm font-semibold"
          >
            Visit
          </a>
          <Link
            to={`/links/${props.link._id}`}
            className="inline-block bg-gray-200 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-300 transition duration-200 text-sm font-semibold"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="inline-block bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-200 text-sm font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export function AddLink() {
  return <div>{/* Content for AddLink component - to be styled later */}</div>;
}