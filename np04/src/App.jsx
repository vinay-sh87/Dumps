import axios from "axios";
import { useState } from "react";
const api = axios.create({
  baseURL: "http://durgeshku-001-site1.jtempurl.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const App = () => {
  const initialUser = {
    name: "",
    email: "",
    phone: "",
    collegeName: "",
    course: "",
  };
  const [user, setUser] = useState(initialUser);
  const [users, setUsers] = useState([]);
  const [isGetOn, setIsGetOn] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleGetUsers = async () => {
    const response = await api.get("/Student");
    setUsers(response.data);
    console.log(response.data);
  };
  const handleSetUser = async (e) => {
    e.preventDefault();
    if (editMode && editingUserId) {
      await api({
        method: "put",
        url: `/Student/${editingUserId}`,
        data: user,
      });
    } else {
      await api({
        method: "post",
        url: "/Student",
        data: user,
      });
    }
    setUser(initialUser);
    handleGetUsers();
    setEditMode(false);
    setEditingUserId(null);
  };
  const handleDeleteUser = async (id) => {
    await api({
      method: "delete",
      url: `/Student/${id}`,
    });
    handleGetUsers();
    localStorage.setItem('user',JSON.stringify(user));
  };
  const handleEditUser = (u) => {
    setUser({
      name: u.name,
      email: u.email,
      phone: u.phone,
      collegeName: u.collegeName,
      course: u.course,
    });
    setEditingUserId(u.id);
    setEditMode(true);
  };

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-12 col-lg-5 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  {editMode ? "Edit Student" : "Add Student"}
                </h5>
                <form action="" onSubmit={handleSetUser}>
                  <div className="row">
                    <div className="col-12 mb-3">
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Name"
                        value={user.name}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email"
                        value={user.email}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <input
                        className="form-control"
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="Enter phone"
                        value={user.phone}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <input
                        className="form-control"
                        type="text"
                        name="collegeName"
                        id="college"
                        placeholder="Enter college name"
                        value={user.collegeName}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <input
                        className="form-control"
                        type="text"
                        name="course"
                        id="course"
                        placeholder="Enter course"
                        value={user.course}
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-success" type="submit">
                      {editMode ? "Save" : "Post"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        handleGetUsers();
                        setIsGetOn(true);
                      }}
                    >
                      Get Data
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <h4 className="mb-3">Students</h4>
            {!isGetOn && (
              <div className="alert alert-secondary">No data loaded yet.</div>
            )}
            {isGetOn && users.length === 0 && (
              <div className="alert alert-warning">No students found.</div>
            )}
            {isGetOn && users.length > 0 && (
              <div className="row g-3">
                {users.map((u, idx) => (
                  <div className="col-12 col-md-6" key={u.id ?? u.email ?? idx}>
                    <div className="card h-100 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title mb-1">{u.name || "—"}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {u.email || "—"}
                        </h6>
                        <p className="card-text mb-1">
                          <strong>Phone:</strong> {u.phone || "—"}
                        </p>
                        <p className="card-text mb-1">
                          <strong>College:</strong> {u.collegeName || "—"}
                        </p>
                        <p className="card-text">
                          <strong>Course:</strong> {u.course || "—"}
                        </p>
                      </div>
                      <div className="card-footer bg-white d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          ID: {u.id ?? "N/A"}
                        </small>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleEditUser(u)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteUser(u.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
