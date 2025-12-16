import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    FullName: "",
    EmailId: "",
    Password: "",
    ConfirmPassword: "",
    PhoneNumber: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // [] to put variable as property name
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (form.Password !== form.ConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // await waits for fetch to finish
      const res = await fetch(
        "http://durgeshk-001-site1.anytempurl.com/api/Auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json(); // wait for JSON parsing

      if (res.ok) {
        alert(data.message); // registration successful
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container shadow p-5 w-50 my-5">
          <div>
            <h2 className="fw-semibold text-center">Register User</h2>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="input-group py-2">
              <input
                type="text"
                name="FullName"
                placeholder="Enter full name"
                className="px-3 py-1 form-control"
                value={form.FullName}
                onChange={handleChange}
              />
            </div>
            <div className="input-group py-2">
              <input
                type="text"
                name="EmailId"
                placeholder="Enter email"
                className="px-3 py-1 form-control"
                value={form.EmailId}
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
            <div className="input-group py-2">
              <input
                type="text"
                name="ConfirmPassword"
                placeholder="Confirm Password"
                className="px-3 py-1 form-control"
                value={form.ConfirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="input-group py-2">
              <input
                type="text"
                name="PhoneNumber"
                placeholder="Enter Phone Number"
                className="px-3 py-1 form-control"
                value={form.PhoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex gap-3">
              <button className="btn btn-success my-2 w-100">Register</button>
              <Link to="/login" className="btn btn-primary my-2 w-100">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
