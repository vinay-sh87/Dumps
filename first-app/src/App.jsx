import React from 'react';
import { useState } from "react";
import Button from "./components/Buttton";

const App = () => {
  return (
    <>
      <Welcome />
      <hr />
      <Greeting name={"alex"} age={30} />
      <hr />
      <Counter />
      <div>
        <ToggleSwitch />
      </div>
      <hr />
      <div>
        <NameInput />
      </div>
      <hr />
      {console.log(React.version)}
    </>
  );
};
export default App;

// Components
// simple component
function Welcome() {
  return <h1>Hello, there... welcome!</h1>;
}

// component with props
// props - data passed from parent
function Greeting({ name, age }) {
  return (
    <>
      <h2>Hello {name}</h2>
      <p>You are {age} years old</p>
    </>
  );
}

// State - components internal memory that changes over the time
function Counter() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("black");

  return (
    <>
      <h2>Counter</h2>
      <p className={`fs-2 mb-0 text-${color}`}>{count}</p>
      <div className="d-flex gap-2">
        <button
          className="mt-3 p-2 border-0 shadow rounded-1 bg-primary"
          onClick={() => {
            setCount((c) => c - 1);
            setColor("primary");
          }}
        >
          Decrement
        </button>
        <button
          className="mt-3 p-2 border-0 shadow rounded-1 bg-danger"
          onClick={() => {
            setCount(0);
            setColor("danger");
          }}
        >
          Reset
        </button>
        <button
          className="mt-3 p-2 border-0 shadow rounded-1 bg-success"
          onClick={() => {
            setCount((c) => c + 1);
            setColor("success");
          }}
        >
          Increment
        </button>
      </div>
    </>
  );
}

function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);

  return (
    <>
      <button
        className={`mt-3 p-2 border-0 rounded-1 bg-${
          isOn ? "success" : "danger"
        }`}
        onClick={() => setIsOn(!isOn)}
      >
        Status: {isOn ? "ON ✔" : "OFF ❌"}
      </button>
    </>
  );
}

function NameInput() {
  const [name, setName] = useState("");

  const handleChange = (e) => setName(e.target.value)
  const handleClear = () => setName("");


  return (
    <>
      <div className="my-3">
        <input
          className="border text-white p-2 rounded-1"
          placeholder="Enter your name"
          type="text"
          value={name}
          // onChange={(e) => setName(e.target.value)}
          onChange={handleChange}
        />
        <div className="pt-3">
          <p>
            Hello : <i>{name || "stranger"}!</i>
          </p>
          <button
            className="btn btn-primary text-white px-4"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
}
