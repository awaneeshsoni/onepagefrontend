import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Consider removing or modifying

export default function ShowPage(props) {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/pages/${props.page.slug}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-800">
        {props.page.title}
      </h3>
      <div className="space-x-2">
        <a
          href={`/${props.page.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gray-800 text-white py-2 px-4 rounded-full hover:bg-gray-700 transition duration-200 text-sm font-semibold"
        >
          Visit
        </a>
        <button
          onClick={handleEditClick}
          className="inline-block bg-gray-200 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-300 transition duration-200 text-sm font-semibold"
        >
          Edit
        </button>
      </div>
    </div>
  );
}