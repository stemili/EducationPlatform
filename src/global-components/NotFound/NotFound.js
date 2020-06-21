import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not_found_page">
      <img
        src={`${process.env.PUBLIC_URL}/resources/not_found.png`}
        alt="404"
      />
      <p>SORRY, PAGE NOT FOUND</p>
      <button className="btn btn-not-found">
        <Link to="/" style={{ color: "#fff" }}>
          Go Home
        </Link>
      </button>
    </div>
  );
};

export default NotFound;
