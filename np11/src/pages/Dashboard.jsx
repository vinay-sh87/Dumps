import { logout } from "../services/auth.service";

export default function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <p>You are logged in</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
