// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa'; // Example icon

function Navbar() {
  const username = localStorage.getItem("username") || "User"; 
  console.log(username)// Get user name, default to "User"

  return (
    <header className="bg-white shadow-md py-4 mb-10"> {/* Changed here */}
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="text-orange-500 text-2xl font-bold">
          OnePage
        </Link>
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-gray-600 text-2xl" /> {/* User icon */}
          <span className="text-gray-700">{username}</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;