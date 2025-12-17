import React from "react";

export default function MovieCard({
  movie = {},
  isFavorite = false,
  onToggleFavorite = () => {},
}) {
  const { title = "Untitled", poster_path, vote_average, release_date } = movie;
  const poster = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <article className="mono-card relative overflow-hidden rounded-xl">
      <button
        aria-pressed={isFavorite}
        onClick={onToggleFavorite}
        className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-white/6 transition-colors"
        title={isFavorite ? "Remove favorite" : "Add favorite"}
      >
        {isFavorite ? (
          <svg
            className="h-5 w-5 text-pink-400"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M12 21s-7.5-4.35-9.5-7.07C.9 11.95 3 7.5 7.5 7.5 9.2 7.5 10.6 8.2 12 9.5c1.4-1.3 2.8-2 4.5-2 4.5 0 6.6 4.45 4 6.43C19.5 16.65 12 21 12 21z" />
          </svg>
        ) : (
          <svg
            className="h-5 w-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.1 21.35l-1.1-1.02C5.14 15.36 2 12.61 2 9.5 2 7.01 4.01 5 6.5 5c1.74 0 3.41.81 4.5 2.09C12.09 5.81 13.76 5 15.5 5 17.99 5 20 7.01 20 9.5c0 3.11-3.14 5.86-8.99 10.83l-1.1 1.02z"
            />
          </svg>
        )}
      </button>

      <div className="w-full h-80 sm:h-96">
        <img src={poster} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base text-white font-semibold leading-tight truncate">
              {title}
            </h3>
            <p className="text-xs text-muted mt-1">
              {release_date ? release_date.slice(0, 4) : "—"}
            </p>
          </div>

          <div className="ml-4 text-sm text-muted hidden sm:block">
            {vote_average ? vote_average.toFixed(1) : "—"}
          </div>
        </div>
      </div>
    </article>
  );
}
