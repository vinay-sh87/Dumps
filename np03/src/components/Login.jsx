import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [form, setForm] = useState({ Email: "", Password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://durgeshk-001-site1.anytempurl.com/api/Auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
        return;
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container shadow p-5 w-50 my-5">
          <div>
            <h2 className="fw-semibold text-center">Login</h2>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="input-group py-2">
              <input
                type="text"
                name="Email"
                placeholder="Enter email"
                className="px-3 py-1 form-control"
                value={form.Email}
                onChange={handleChange}
              />
            </div>
            <div className="input-group py-2">
              <input
                type="text"
                name="Password"
                placeholder="Enter password"
                className="px-3 py-1 form-control"
                value={form.Password}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex gap-3">
              <Link to="/" className="btn btn-success my-2 w-100">
                Register
              </Link>
              <button className="btn btn-success my-2 w-100">Log in</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
