import { useState } from "react";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const user = await login(form.email, form.password);
    setUser(user);
    navigate("/");
  };

  return (
    <AuthForm
      title="Login"
      submitText="Login"
      onSubmit={handleSubmit}
      fields={[
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
