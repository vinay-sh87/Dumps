import { useState } from "react";
import { useUser } from "../lib/context/user";

export default function Login() {
  const initialForm = { email: "", password: "" };
  const user = useUser();
  const [form, setForm] = useState(initialForm);

  return (
    <>
      <section>
        <h1>Login or Register</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            onClick={() => user.login(form.email, form.password)}
          >
            Login
          </button>
          <button onClick={() => user.register(form.email, form.password)}>
            Register
          </button>
        </form>
      </section>
    </>
  );
}
