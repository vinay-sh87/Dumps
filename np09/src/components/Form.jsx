import { useReducer } from "react";

const initialState = {
  name: "",
  email: "",
  age: 0,
};

const updateForm = (state, action) => {
  switch (action.type) {
    case "setName":
      return {
        ...state,
        name: action.value,
      };
    case "setEmail":
      return {
        ...state,
        email: action.value,
      };
    case "setAge":
      return {
        ...state,
        age: action.value,
      };
    default:
      return initialState;
  }
};

export default function Form() {
  const [form, operation] = useReducer(updateForm, initialState);
  return (
    <>
      <div>
        <input
          type="text"
          value={form.name}
          onChange={(e) =>
            operation({
              type: "setName",
              value: e.target.value,
            })
          }
          placeholder="Name"
        />
        <input
          type="email"
          value={form.email}
          onChange={(e) =>
            operation({
              type: "setEmail",
              value: e.target.value,
            })
          }
          placeholder="Email"
        />
        <input
          type="number"
          onChange={(e) =>
            operation({
              type: "setAge",
              value: e.target.value,
            })
          }
          placeholder="Age"
        />
        <button onClick={() => operation({ type: "reset" })}>Reset</button>
        <div>
          <p>Name: {form.name}</p>
          <p>Email: {form.email}</p>
          <p>Age: {form.age}</p>
        </div>
      </div>
    </>
  );
}
