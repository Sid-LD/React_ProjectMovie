import { useState } from "react";
import MovieDetailModal from "./MovieDetailModal";

const MovieCard = ({
  movie: {
    id,
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
  },
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="movie-card cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
        onClick={() => setShowModal(true)}
        style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
      >
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/no-movie.png"
          }
          alt={title}
        />

        <div className="mt-4">
          <h3>{title}</h3>
          <div className="content">
            <div className="rating">
              <img src="/star.svg" alt="Star Icon" />
              <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            </div>
            <span>•</span>
            <p className="lang">{original_language}</p>
            <span>•</span>
            <p className="year">
              {release_date ? release_date.split("-")[0] : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <MovieDetailModal movieId={id} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default MovieCard;
