import { useState } from "react";

export function AddUser({ user, setUser, users, setUsers, initialUser }) {
  const [isAddOn, setIsAddOn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !user.firstname ||
      !user.lastname ||
      !user.age ||
      !user.gender ||
      !user.phone ||
      !user.token
    ) {
      alert("Please fill all the fields");
      return;
    }
    const newUser = { ...user, id: Date.now() };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUser(initialUser);
  };
  return (
    <>
      <div className="shadow py-3">
        <div className="d-flex align-items-center justify-content-between mx-4 mb-2 my-3 ">
          <button className="btn btn-success " onClick={() => setIsAddOn(true)}>
            Add User
          </button>
          <button
            className="btn bg-danger text-white"
            onClick={() => setIsAddOn(false)}
          >
            X
          </button>
        </div>
        {isAddOn && (
          <div className="container bg-white px-4 pb-4">
            <form action="" onSubmit={handleSubmit}>
              <div className="row">
                {/* firstname  */}
                <div className="col-md-6">
                  <div className="my-2">
                    <label htmlFor="firstName" className="fw-semibold">
                      First Name:{" "}
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="firstName"
                        placeholder="Enter first name"
                        className="px-3 py-1 mt-2 cst-inp"
                        value={user.firstname}
                        onChange={(e) =>
                          setUser({ ...user, firstname: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                {/* last name  */}
                <div className="col-md-6">
                  <div className="my-2">
                    <label htmlFor="lastName" className="fw-semibold">
                      Last Name:{" "}
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="lastName"
                        placeholder="Enter last name"
                        className="px-3 py-1 mt-2 cst-inp"
                        value={user.lastname}
                        onChange={(e) =>
                          setUser({ ...user, lastname: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                {/* email  */}
                <div className="col-md-6">
                  <div className="my-2">
                    <label htmlFor="email" className="fw-semibold">
                      Email:{" "}
                    </label>
                    <div className="input-group">
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        className="px-3 py-1 mt-2 cst-inp"
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                {/* phone */}
                <div className="col-md-6">
                  <div className="my-2">
                    <label htmlFor="phone" className="fw-semibold">
                      Phone:{" "}
                    </label>
                    <div className="input-group">
                      <input
                        type="tel"
                        id="phone"
                        placeholder="Enter phone number"
                        className="px-3 py-1 mt-2 cst-inp"
                        value={user.phone}
                        onChange={(e) =>
                          setUser({ ...user, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                {/* age */}
                <div className="col-md-6">
                  <div className="my-2">
                    <label htmlFor="age" className="fw-semibold">
                      Age:{" "}
                    </label>
                    <div className="input-group">
                      <input
                        type="number"
                        id="age"
                        placeholder="Enter age"
                        className="px-3 py-1 mt-2 cst-inp"
                        value={user.age}
                        onChange={(e) =>
                          setUser({ ...user, age: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                {/* gender */}
                <div className="col-md-6">
                  <div className="my-2">
                    <label className="form-label fw-semibold">Gender</label>

                    <div className="d-flex gap-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="male"
                          value="male"
                          checked={user.gender === "male"}
                          onChange={(e) =>
                            setUser({ ...user, gender: e.target.value })
                          }
                        />
                        <label className="form-check-label" htmlFor="male">
                          Male
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="female"
                          value="female"
                          checked={user.gender === "female"}
                          onChange={(e) =>
                            setUser({ ...user, gender: e.target.value })
                          }
                        />
                        <label className="form-check-label" htmlFor="female">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="my-2">
                    <label htmlFor="token" className="fw-semibold">
                      Token:
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="token"
                        placeholder="Enter token"
                        className="px-3 py-1 mt-2 cst-inp"
                        value={user.token}
                        onChange={(e) =>
                          setUser({ ...user, token: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-danger rounded-1 mt-3 px-4 py-2"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export function UserCard({ user, users, setUsers }) {
  const handleRemoveUser = (id) => {
    const newUsers = users.filter((u) => u.id != id);
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };
  return (
    <>
      <div className="mb-3 shadow px-3 py-1">
        <div className="d-flex align-items-center justify-content-between ">
          <h6 className="fw-semibold">{user.firstname + " " + user.lastname}</h6>
          <button className="btn" onClick={() => handleRemoveUser(user.id)}>
            <i class="fa-solid fa-trash-can text-danger"></i>
          </button>
        </div>
        <p>
          <span className="">
            <i className="fa-regular fa-user me-1 text-success"></i>
          </span>
          {user.age}{" "}
          <span className="">
            <i className="fa-solid fa-square-phone ms-2 me-1 text-success"></i>
          </span>
          {user.phone}{" "}
          <span>
            <i className="fa-solid fa-envelope ms-2 me-1 text-success"></i>
          </span>
          {user.email}{" "}
          <span>
            <i className="fa-solid fa-mars-and-venus ms-2 me-1 text-success"></i>
          </span>
          {user.gender}{" "}
          <span>
            <i className="fa-solid fa-square-binary ms-2 me-1 text-success"></i>
          </span>
          {user.token}
        </p>
      </div>
    </>
  );
}

const App = () => {
  const initialUser = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    token: "",
  };
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });
  const [user, setUser] = useState(initialUser);
  const [showUsers, setShowUsers] = useState(false);

  return (
    <>
      <div className="main-container">
        <div className="container w-50 my-5 ">
          <header className="header bg-black rounded-top-2">
            <h5 className="text-white text-center p-3 text-uppercase">
              Event Registration Form
            </h5>
          </header>
          <AddUser
            user={user}
            setUser={setUser}
            users={users}
            setUsers={setUsers}
            initialUser={initialUser}
          />
          <div className="card-container mt-5">
            <header className="header bg-black rounded-top-2">
              <h5 className="text-white text-center p-3 text-uppercase">
                Users Details
              </h5>
            </header>
            <div className="d-flex align-items-center justify-content-between mx-4 my-4 ">
              <button
                className="btn btn-success "
                onClick={() => setShowUsers(true)}
              >
                Show Users
              </button>
              <button
                className="btn bg-danger text-white"
                onClick={() => setShowUsers(false)}
              >
                Hide
              </button>
            </div>
            {showUsers &&
              users.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  users={users}
                  setUsers={setUsers}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
