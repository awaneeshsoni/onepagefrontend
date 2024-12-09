import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to OnePage</h1>
      <p>Store all your links in "OnePage" and share them with the world!</p>
      <Link to="/signup">Sign In</Link>
      <br></br>
      <Link to="/login">Log In</Link>
    </div>
  );
};

export default Home;
