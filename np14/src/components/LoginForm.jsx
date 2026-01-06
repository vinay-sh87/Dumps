import React, { useState } from "react";

function useFormInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const reset = () => {
    setValue(initialValue);

  };

  return {
    value,
    onChange: handleChange,
    reset,
  };
}

export default function LoginForm() {
  const email = useFormInput("");
  const password = useFormInput("");
  const { reset: resetEmail, ...emailProps } = email;
  const { reset: resetPassword, ...passwordProps } = password;

  return (
    <>
      <form>
        <input
          className="px-5 py-1 border rounded me-5"
          type="text"
          {...emailProps}
          placeholder="Enter email"
        />
        <input
          className="px-5 py-1 border rounded me-5"
          type="password"
          {...passwordProps}
          placeholder="Enter password"
        />
        <button
          className="flex bg-blue-500 px-5 py-2 rounded shadow mt-3"
          onClick={() => {
            resetEmail(), resetPassword();
          }}
        >
          Reset Form
        </button>
      </form>
    </>
  );
}
