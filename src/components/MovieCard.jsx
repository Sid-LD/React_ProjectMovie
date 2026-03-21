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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className="movie-card cursor-pointer"
        onClick={() => setShowModal(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered
            ? "translateY(-6px) scale(1.02)"
            : "translateY(0) scale(1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          boxShadow: isHovered
            ? "0 20px 40px rgba(139,92,246,0.25)"
            : "inset 0 0 0 1px rgba(206,206,251,0.05)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Hover gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(124,58,237,0.2), transparent)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Click to view icon */}
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease, transform 0.3s ease",
            zIndex: 2,
            background: "rgba(124,58,237,0.95)",
            borderRadius: "50%",
            width: 52,
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            pointerEvents: "none",
            boxShadow: "0 0 20px rgba(124,58,237,0.6)",
          }}
        >
          🔍
        </div>

        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/no-movie.png"
          }
          alt={title}
          style={{
            transition: "filter 0.3s ease",
            filter: isHovered ? "brightness(0.65)" : "brightness(1)",
          }}
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
