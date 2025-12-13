import { useState } from "react";

const SearchBar = () => {
  //  string state
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Searching for " + query);
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit} className="d-flex gap-3">
        <input
          className="border-0 p-2 text-black bg-white w-50"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn btn-primary rounded-1 w-25 p-2"
          disabled={!query}
        >
          Search
        </button>
      </form>
    </>
  );
};
export default SearchBar;
