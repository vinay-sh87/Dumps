import React, { useState } from "react";
import logo from "../assets/logo.svg";
import background from "../assets/bg.a5020df0.svg";
import { Link } from "react-router-dom";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const initialCredential = { Email: "", Password: "" };
  const [credentials, setCredentials] = useState(initialCredential);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if(!credentials.Email || !credentials.Password){
        alert('All fields are required');
        return;
    }
    try{
        const response = await login(credentials);

        console.log(response);
        console.log(response.token);
        navigate('/')

    }catch(err){
        console.log(err);
        alert('Invalid email or password')
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
                  <div className="logo py-3 pb-5">
                    <img className="img-fluid" src={logo} alt="" />
                  </div>
                  <h5 className="py-4 fw-semibold">Login</h5>
                  <form action="" onSubmit={handleOnSubmit} className="w-100">
                    <label className="form-label fw-semibold" htmlFor="email">
                      Email
                    </label>
                    <div className="input-group mb-3">
                      <input
                        className="form-control rounded-0 px-4 py-2"
                        type="email"
                        id="email"
                        name="Email"
                        placeholder="user@mail.com"
                        value={credentials.Email}
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
                    <div className="d-flex align-items-center justify-content-between pt-4">
                      <Link
                        to="/register"
                        className="fw-semibold text-decoration-none"
                        style={{ color: "#BD744C" }}
                      >
                        Create an Account
                      </Link>
                      <button
                        type="submit"
                        className="fw-semibold btn text-white rounded-0 text-uppercase px-5 py-2"
                        style={{ backgroundColor: "#BD744C" }}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  <div className="d-flex gap-3" style={{ marginTop: "10rem" }}>
                    <a
                      className="text-decoration-none fw-semibold "
                      style={{ color: "#444" }}
                      href="#"
                    >
                      Terms & conditions
                    </a>
                    <a
                      className="text-decoration-none fw-semibold "
                      style={{ color: "#444" }}
                      href="#"
                    >
                      Privacy Policy
                    </a>
                    <a
                      className="text-decoration-none fw-semibold "
                      style={{ color: "#444" }}
                      href="#"
                    >
                      Forgot password
                    </a>
                  </div>
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
