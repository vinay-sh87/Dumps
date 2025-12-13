import { useState } from "react";
import { Trash2, User, MailCheck } from "lucide-react";

function UserHeader({ user, setUser, users, setUsers }) {
  const [isAddUser, setIsAddUser] = useState(false);

  const handleSubmit = () => {
    if (!user.name || !user.age || !user.email)
      return alert("Fill all the input fields");

    setUsers([...users, user]);
    alert("User Submitted: " + JSON.stringify(user));
    setUser({});
    setIsAddUser(false);
  };

  return (
    <div className="mb-4">
      <button
        className="btn btn-primary mb-3"
        onClick={() => setIsAddUser(true)}
      >
        Add User
      </button>

      {isAddUser && (
        <div className="p-3 mb-3 shadow-sm">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={user.name || ""}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Enter age"
                value={user.age || ""}
                onChange={(e) => setUser({ ...user, age: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={user.email || ""}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="col-md-2 d-flex gap-2">
              <button className="btn btn-success" onClick={handleSubmit}>
                Submit
              </button>
              <button
                className="btn btn-danger text-white"
                onClick={() => setIsAddUser(false)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function UserCard({ user, users, setUsers }) {
  const handleDelete = () => {
    setUsers(users.filter((u) => u !== user));
  };
  return (
    <div className=" mb-3 border rounded-2 p-2">
      <div className="d-flex justify-content-between align-items-center px-4 ">
        <div>
          <h2>{user.name}</h2>
          <div className="d-flex gap-3 align-items-center">
            <p className="d-flex align-items-center">
              <User color="#E45A2D" className="me-1" /> {user.age}
            </p>
            <p className="d-flex align-items-center">
              <MailCheck color="#E45A2D" className="me-1" /> {user.email}
            </p>
          </div>
        </div>
        <button className="btn" onClick={handleDelete}>
          <Trash2 />
        </button>
      </div>
    </div>
  );
}

const UserProfile = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Profile</h2>
      <UserHeader
        user={user}
        setUser={setUser}
        users={users}
        setUsers={setUsers}
      />
      {users.map((u, index) => (
        <UserCard key={index} user={u} users={users} setUsers={setUsers} />
      ))}
    </div>
  );
};

export default UserProfile;