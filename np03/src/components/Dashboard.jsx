import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Dashboard</h2>
        <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
      </div>
      <p>
        Token:{" "}
        {token
          ? token.length > 24
            ? token.slice(0, 24) + "..."
            : token
          : "No token"}
      </p>
      <div className="container">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore velit quisquam beatae, similique quasi dignissimos non corrupti blanditiis officia minus pariatur illo, nisi magni voluptatum labore consectetur! Sequi, iure hic?</p>
      </div>
    </div>
  );
}
