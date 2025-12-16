import { useState } from "react";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Login } from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <nav className="p-3 bg-light">
          <Link to="/" className="me-3 text-decoration-none text-black ">
            Register
          </Link>
          <Link to="/login" className="me-3 text-decoration-none text-black ">
            Login
          </Link>
          <Link  to="/dashboard" className="me-3 text-decoration-none text-black ">Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
