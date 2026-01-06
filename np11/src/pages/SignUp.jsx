import { useState } from "react";
import { signup, login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const user = await signup(form.email, form.password, form.name);
    const sessionUser = await login(form.email, form.password);
    setUser(sessionUser);
    navigate("/");
  };

  return (
    <AuthForm
      title="Create Account"
      submitText="Signup"
      onSubmit={handleSubmit}
      fields={[
        {
          name: "name",
          placeholder: "Name",
          value: form.name,
          onChange: (e) =>
            setForm({ ...form, name: e.target.value }),
        },
        {
          name: "email",
          placeholder: "Email",
          value: form.email,
          onChange: (e) =>
            setForm({ ...form, email: e.target.value }),
        },
        {
          name: "password",
          type: "password",
          placeholder: "Password",
          value: form.password,
          onChange: (e) =>
            setForm({ ...form, password: e.target.value }),
        },
      ]}
    />
  );
}
