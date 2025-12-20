import React, { useState } from "react";
import logo from "../assets/logo.svg";
import background from "../assets/bg.7735b650.png";
import { Link } from "react-router-dom";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const initialCredential = {
    EmailId: "",
    Password: "",
    FullName: "",
    ConfirmPassword: "",
    PhoneNumber: "",
  };
  const [credentials, setCredentials] = useState(initialCredential);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (
      !credentials.FullName ||
      !credentials.EmailId ||
      !credentials.Password ||
      !credentials.ConfirmPassword ||
      !credentials.PhoneNumber
    ) {
      alert("All fields are required");
      return;
    }
    if (credentials.Password !== credentials.ConfirmPassword) {
      alert("Passwords don't match");
      return
    }
    try {
        setLoading(true);
      const response = await register(credentials);
      setLoading(false)
      console.log(response);
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Failed to register");
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div className="d-flex flex-column justify-content-center align-items-center h-100 col-12 col-md-6">
            <div className="container">
              <div className="d-flex justify-content-center row">
                <div className=" col-auto col-lg-8">
                  <div className="logo ">
                    <img className="img-fluid" src={logo} alt="" />
                  </div>
                  <h5 className="py-4 fw-semibold">Sign Up</h5>
                  <form action="" onSubmit={handleOnSubmit} className="w-100">
                    <label
                      className="form-label fw-semibold"
                      htmlFor="fullname"
                    >
                      Full Name
                    </label>
                    <div className="input-group mb-3">
                      <input
                        className="form-control rounded-0 px-4 py-2"
                        type="text"
                        id="fullname"
                        name="FullName"
                        placeholder="Full name"
                        value={credentials.FullName}
                        onChange={handleChange}
                      />
                    </div>
                    <label className="form-label fw-semibold" htmlFor="email">
                      Email
                    </label>
                    <div className="input-group mb-3">
                      <input
                        className="form-control rounded-0 px-4 py-2"
                        type="email"
                        id="email"
                        name="EmailId"
                        placeholder="user@mail.com"
                        value={credentials.EmailId}
                        onChange={handleChange}
                      />
                    </div>
                    <label
                      className="form-label fw-semibold"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <div className="input-group mb-3">
                      <input
                        className="form-control rounded-0 px-4 py-2"
                        type="password"
                        id="password"
                        name="Password"
                        placeholder="password"
                        value={credentials.Password}
                        onChange={handleChange}
                      />
                    </div>
                    <label
                      className="form-label fw-semibold"
                      htmlFor="confirmpassword"
                    >
                      Confirm Password
                    </label>
                    <div className="input-group mb-3">
                      <input
                        className="form-control rounded-0 px-4 py-2"
                        type="password"
                        id="confirmpassword"
                        name="ConfirmPassword"
                        placeholder="Confirm Password"
                        value={credentials.ConfirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <label className="form-label fw-semibold" htmlFor="phone">
                      Phone
                    </label>
                    <div className="input-group mb-3">
                      <input
                        className="form-control rounded-0 px-4 py-2"
                        type="tel"
                        id="phone"
                        name="PhoneNumber"
                        placeholder="phone number"
                        value={credentials.PhoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex align-items-center justify-content-between pt-4">
                      <Link
                        to="/login"
                        className="fw-semibold text-decoration-none"
                        style={{ color: "#BD744C" }}
                      >
                        Login to your account
                      </Link>
                      <button
                        type="submit"
                        className="fw-semibold btn text-white rounded-0 text-uppercase px-5 py-2"
                        style={{ backgroundColor: "#BD744C" }}
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="d-none d-md-inline-block vh-100 col-sm-6">
            <img
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
              src={background}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
