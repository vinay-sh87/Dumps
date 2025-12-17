import { useState } from "react";
import { useEffect } from "react";
import Header from "./components/Header";
import Favorites from "./components/Favorites";
import tmdb from "./services/tmdb";
import MovieCard from "./components/MovieCard";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (e) {
      console.warn("Could not persist favorites", e);
    }
  }, [favorites]);

  const toggleFavorite = (movie) => {
    console.log("toggleFavorite", movie && movie.id);
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) {
        console.log("removing favorite", movie.id);
        return prev.filter((m) => m.id !== movie.id);
      }
      console.log("adding favorite", movie.id);
      return [movie, ...prev];
    });
  };
  const [view, setView] = useState("home");

  const handleSearch = async (query) => {
    try {
      const response = await tmdb({
        url: "/search/movie",
        method: "get",
        params: { query },
      });
      setMovies(response.data.results);
      console.log(response.data.results);
    } catch (err) {
      alert("Failed fetching movie" + err);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-black">
        <Header
          onSearch={handleSearch}
          favorites={favorites}
          onNavigate={setView}
        />

        {view === "home" ? (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorite={favorites.some((f) => f.id === movie.id)}
                  onToggleFavorite={() => toggleFavorite(movie)}
                />
              ))}
            </section>
          </main>
        ) : (
          <Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />
        )}
      </div>
    </>
  );
}
