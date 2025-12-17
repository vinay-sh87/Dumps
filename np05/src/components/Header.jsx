import { useState } from "react";

export default function Header({
  onSearch,
  favorites = [],
  onNavigate = () => {},
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      onSearch && onSearch(query);
    }
  };

  return (
    <header className="bg-transparent text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden mr-3 p-2 rounded-md hover:bg-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-3 focus:outline-none"
            >
              <svg
                className="h-8 w-8 text-white/90"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="4" fill="currentColor" />
                <path
                  d="M6 15l3-3 2 2 5-5"
                  stroke="#0F172A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xl font-semibold tracking-tight">NP05</span>
            </button>

            <nav className="hidden md:flex ml-8 space-x-6 text-sm">
              <button
                onClick={() => onNavigate("home")}
                className="px-2 py-1 rounded hover:bg-white/6"
              >
                Home
              </button>
              <button
                onClick={() => onNavigate("home")}
                className="px-2 py-1 rounded hover:bg-white/6"
              >
                Movies
              </button>
              <button className="px-2 py-1 rounded hover:bg-white/6">TV</button>
              <button className="px-2 py-1 rounded hover:bg-white/6">
                About
              </button>
              <button
                onClick={() => {
                  console.log("navigate favorites");
                  onNavigate("favorites");
                }}
                className="px-2 py-1 rounded hover:bg-white/6"
              >
                Favorites
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <form
              onSubmit={handleSubmit}
              className="hidden sm:flex items-center bg-white/6 rounded-md px-2 py-1"
            >
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search movies..."
                className="bg-transparent placeholder-white/75 text-white text-sm focus:outline-none w-48 sm:w-64"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className="ml-2 p-1 rounded text-white/90 hover:bg-white/12"
                aria-label="Search"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m0 0A7 7 0 1116.65 16.65z"
                  />
                </svg>
              </button>
            </form>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center text-sm text-muted">
                <svg
                  className="h-5 w-5 text-white/90 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12.1 21.35l-1.1-1.02C5.14 15.36 2 12.61 2 9.5 2 7.01 4.01 5 6.5 5c1.74 0 3.41.81 4.5 2.09C12.09 5.81 13.76 5 15.5 5 17.99 5 20 7.01 20 9.5c0 3.11-3.14 5.86-8.99 10.83l-1.1 1.02z"
                  />
                </svg>
                <span className="text-white/90">{favorites.length}</span>
              </div>
              <a
                href="#"
                className="hidden sm:inline-block mono-btn text-sm font-medium"
              >
                Sign in
              </a>
            </div>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-3 pb-4 border-t border-white/10">
            <div className="space-y-2 px-2">
              <a href="#" className="block px-3 py-2 rounded hover:bg-white/5">
                Home
              </a>
              <a href="#" className="block px-3 py-2 rounded hover:bg-white/5">
                Movies
              </a>
              <a href="#" className="block px-3 py-2 rounded hover:bg-white/5">
                TV
              </a>
              <a href="#" className="block px-3 py-2 rounded hover:bg-white/5">
                About
              </a>
              <form onSubmit={handleSubmit} className="pt-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-md bg-white/10 placeholder-white/70 py-2 px-3 text-sm text-white focus:bg-white/20 focus:outline-none"
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
