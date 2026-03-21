import React, { useEffect, useState } from "react";
import Search from "./components/Search.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite.js";
import Navbar from "./components/Navbar";
import AIRecommender from "./components/AIRecommender";
import LandingPage from "./components/LandingPage";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// Skeleton loader
const SkeletonCard = () => (
  <div
    className="movie-card"
    style={{ animation: "pulse 1.5s ease-in-out infinite" }}
  >
    <div
      style={{
        width: "100%",
        height: 300,
        borderRadius: 8,
        background: "rgba(255,255,255,0.06)",
      }}
    />
    <div style={{ marginTop: 16 }}>
      <div
        style={{
          height: 16,
          width: "75%",
          borderRadius: 6,
          background: "rgba(255,255,255,0.06)",
          marginBottom: 10,
        }}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <div
          style={{
            height: 12,
            width: 40,
            borderRadius: 4,
            background: "rgba(255,255,255,0.04)",
          }}
        />
        <div
          style={{
            height: 12,
            width: 30,
            borderRadius: 4,
            background: "rgba(255,255,255,0.04)",
          }}
        />
        <div
          style={{
            height: 12,
            width: 35,
            borderRadius: 4,
            background: "rgba(255,255,255,0.04)",
          }}
        />
      </div>
    </div>
    <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
  </div>
);

const App = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }
      setMovieList(data.results);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!showLanding) {
      fetchMovies(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, showLanding]);

  useEffect(() => {
    if (!showLanding) {
      loadTrendingMovies();
    }
  }, [showLanding]);

  if (showLanding) {
    return <LandingPage onEnter={() => setShowLanding(false)} />;
  }

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <Navbar />
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Love
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {/* Trending */}
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* All Movies */}
        <section className="all-movies">
          <h2>{searchTerm ? `Results for "${searchTerm}"` : "All Movies"}</h2>
          {isLoading ? (
            <ul>
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </ul>
          ) : errorMessage ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px",
                background: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.15)",
                borderRadius: 16,
              }}
            >
              <p style={{ fontSize: 40, margin: "0 0 12px" }}>😕</p>
              <p style={{ color: "#fca5a5" }}>{errorMessage}</p>
            </div>
          ) : movieList.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px" }}>
              <p style={{ fontSize: 40, margin: "0 0 12px" }}>🎬</p>
              <p style={{ color: "rgba(206,206,251,0.5)" }}>
                No movies found. Try a different search!
              </p>
            </div>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>

        {/* AI Recommender */}
        <AIRecommender />
      </div>
    </main>
  );
};

export default App;
