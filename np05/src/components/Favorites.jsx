import React from "react";
import MovieCard from "./MovieCard";

export default function Favorites({
  favorites = [],
  onToggleFavorite = () => {},
}) {
  if (!favorites || favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-muted">
        No favorites yet. Add some movies to your list.
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl text-white font-semibold mb-6">Your Favorites</h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={true}
            onToggleFavorite={() => onToggleFavorite(movie)}
          />
        ))}
      </section>
    </main>
  );
}
