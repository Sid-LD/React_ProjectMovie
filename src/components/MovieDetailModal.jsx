import { useEffect, useState } from "react";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieDetailModal = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const [movieRes, creditsRes, videosRes] = await Promise.all([
          fetch(`${API_BASE_URL}/movie/${movieId}`, API_OPTIONS),
          fetch(`${API_BASE_URL}/movie/${movieId}/credits`, API_OPTIONS),
          fetch(`${API_BASE_URL}/movie/${movieId}/videos`, API_OPTIONS),
        ]);

        const [movieData, creditsData, videosData] = await Promise.all([
          movieRes.json(),
          creditsRes.json(),
          videosRes.json(),
        ]);

        setMovie(movieData);
        setCredits(creditsData);

        const officialTrailer = videosData.results?.find(
          (v) => v.type === "Trailer" && v.site === "YouTube",
        );
        setTrailer(officialTrailer || null);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();

    // Prevent background scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [movieId]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  const formatMoney = (amount) => {
    if (!amount) return "N/A";
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(6px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{
          backgroundColor: "#0f0d23",
          border: "1px solid rgba(206,206,251,0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white text-2xl leading-none transition-colors"
          style={{
            background: "rgba(0,0,0,0.5)",
            borderRadius: "50%",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : movie ? (
          <>
            {/* Backdrop */}
            <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
              {movie.backdrop_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-900 to-indigo-900" />
              )}
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, #0f0d23 0%, transparent 60%)",
                }}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col sm:flex-row gap-6 px-6 pb-8 -mt-20 relative">
              {/* Poster */}
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "/no-movie.png"
                  }
                  alt={movie.title}
                  className="w-32 sm:w-40 rounded-xl shadow-2xl"
                  style={{ border: "3px solid rgba(206,206,251,0.2)" }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h2 className="text-white text-2xl sm:text-3xl font-bold mt-2 leading-tight">
                  {movie.title}
                </h2>
                {movie.tagline && (
                  <p className="text-purple-300 text-sm italic mt-1">
                    {movie.tagline}
                  </p>
                )}

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <span className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
                    ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}
                    <span className="text-gray-400 font-normal">
                      ({movie.vote_count?.toLocaleString()} votes)
                    </span>
                  </span>
                  <span className="text-gray-400 text-sm">•</span>
                  <span className="text-gray-300 text-sm">
                    {movie.release_date?.split("-")[0] ?? "N/A"}
                  </span>
                  <span className="text-gray-400 text-sm">•</span>
                  <span className="text-gray-300 text-sm">
                    {formatRuntime(movie.runtime)}
                  </span>
                  <span className="text-gray-400 text-sm">•</span>
                  <span className="text-gray-300 text-sm uppercase">
                    {movie.original_language}
                  </span>
                </div>

                {/* Genres */}
                {movie.genres?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {movie.genres.map((g) => (
                      <span
                        key={g.id}
                        className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{
                          background: "rgba(139,92,246,0.2)",
                          color: "#c4b5fd",
                          border: "1px solid rgba(139,92,246,0.3)",
                        }}
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Trailer Button */}
                {trailer && !showTrailer && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                      color: "white",
                    }}
                  >
                    ▶ Watch Trailer
                  </button>
                )}
              </div>
            </div>

            {/* Trailer Embed */}
            {showTrailer && trailer && (
              <div className="px-6 mb-6">
                <div
                  className="relative w-full rounded-xl overflow-hidden"
                  style={{ paddingTop: "56.25%" }}
                >
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                    title="Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            <div className="px-6 pb-6 space-y-6">
              {/* Overview */}
              {movie.overview && (
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    Overview
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {movie.overview}
                  </p>
                </div>
              )}

              {/* Cast */}
              {credits?.cast?.length > 0 && (
                <div>
                  <h3 className="text-white font-bold text-lg mb-3">
                    Top Cast
                  </h3>
                  <div
                    className="flex gap-4 overflow-x-auto pb-2"
                    style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
                  >
                    {credits.cast.slice(0, 10).map((actor) => (
                      <div
                        key={actor.id}
                        className="flex-shrink-0 text-center w-20"
                      >
                        <img
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                              : "/no-movie.png"
                          }
                          alt={actor.name}
                          className="w-16 h-16 rounded-full object-cover mx-auto"
                          style={{ border: "2px solid rgba(139,92,246,0.4)" }}
                        />
                        <p className="text-white text-xs font-medium mt-1 leading-tight line-clamp-2">
                          {actor.name}
                        </p>
                        <p className="text-gray-400 text-xs line-clamp-1">
                          {actor.character}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Extra Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Status", value: movie.status },
                  { label: "Budget", value: formatMoney(movie.budget) },
                  { label: "Revenue", value: formatMoney(movie.revenue) },
                  { label: "Popularity", value: movie.popularity?.toFixed(0) },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl p-3 text-center"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <p className="text-gray-400 text-xs mb-1">{label}</p>
                    <p className="text-white text-sm font-semibold">
                      {value ?? "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-400">
            Failed to load movie details.
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailModal;
