import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [number, setNumber] = useState([1, 2, 3, 4, 5]);
  return (
    <>
      <Navbar />
      <h1>Home Page</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores,
        inventore vero explicabo placeat enim ducimus nam qui harum temporibus
        labore, fuga itaque eos facere eveniet autem! Et beatae eos magnam?
      </p>
      {number.map((n) => (
        <li key={n}>List {n}</li>
      ))}
    </>
  );
}
