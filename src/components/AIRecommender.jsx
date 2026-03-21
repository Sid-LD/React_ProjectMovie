import { useState } from "react";

const AIRecommender = () => {
  const [mood, setMood] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const getRecommendations = async () => {
    if (!mood.trim()) return;
    setIsLoading(true);
    setError("");
    setRecommendations([]);
    setHasSearched(true);

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "user",
                content: `You are a movie expert. Based on this mood/request: "${mood}"

Recommend exactly 5 movies. Respond ONLY with a JSON array, no other text, no markdown, no backticks. Format:
[
  {
    "title": "Movie Title",
    "year": "2020",
    "genre": "Drama, Thriller",
    "reason": "One sentence why this matches the mood",
    "rating": "8.5"
  }
]`,
              },
            ],
            max_tokens: 1000,
            temperature: 0.7,
          }),
        },
      );

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      const text = data.choices[0].message.content.trim();
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setRecommendations(parsed);
    } catch (err) {
      console.error(err);
      setError("Failed to get recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const moodExamples = [
    "🎭 Funny Friday night movie",
    "😱 Scary but not gory",
    "🥹 Feel-good friendship story",
    "🧠 Mind-bending sci-fi",
    "💔 Sad romantic movie",
  ];

  const genreColors = {
    Action: "#ef4444",
    Drama: "#8b5cf6",
    Comedy: "#f59e0b",
    Thriller: "#6366f1",
    Horror: "#dc2626",
    Romance: "#ec4899",
    "Sci-Fi": "#06b6d4",
    Animation: "#10b981",
    Crime: "#f97316",
  };

  const getGenreColor = (genre) => {
    const first = genre?.split(",")[0]?.trim();
    return genreColors[first] || "#8b5cf6";
  };

  return (
    <section className="mt-20 mb-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
        >
          🤖
        </div>
        <div>
          <h2 className="!text-2xl !font-bold">AI Movie Recommender</h2>
          <p className="text-gray-400 text-sm">
            Powered by Groq AI · Llama 3.3
          </p>
        </div>
      </div>

      <p className="text-gray-400 text-sm mb-5 mt-3">
        Describe your mood or what you're in the mood for — AI will find the
        perfect movies for you
      </p>

      {/* Input box */}
      <div
        className="w-full rounded-2xl p-4"
        style={{
          background: "rgba(206,206,251,0.04)",
          border: "1px solid rgba(206,206,251,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
              ✨
            </span>
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && getRecommendations()}
              placeholder="e.g. I want a funny movie for Friday night..."
              className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-sm pl-10 py-2"
            />
          </div>
          <button
            onClick={getRecommendations}
            disabled={isLoading || !mood.trim()}
            className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40 whitespace-nowrap"
            style={{
              background: isLoading
                ? "rgba(124,58,237,0.5)"
                : "linear-gradient(135deg, #7c3aed, #4f46e5)",
              color: "white",
              boxShadow: "0 4px 15px rgba(124,58,237,0.3)",
            }}
          >
            {isLoading ? "Thinking..." : "Ask AI ✨"}
          </button>
        </div>

        {/* Mood chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          {moodExamples.map((example, i) => (
            <button
              key={i}
              onClick={() => setMood(example.replace(/^[^\s]+\s/, ""))}
              className="text-xs px-3 py-1.5 rounded-full transition-all hover:scale-105"
              style={{
                background: "rgba(139,92,246,0.12)",
                color: "#c4b5fd",
                border: "1px solid rgba(139,92,246,0.25)",
              }}
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="mt-6 space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex gap-4 p-4 rounded-xl animate-pulse"
              style={{
                background: "rgba(15,13,35,0.8)",
                border: "1px solid rgba(206,206,251,0.05)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />
              <div className="flex-1 space-y-2">
                <div
                  className="h-4 rounded-md"
                  style={{ width: "60%", background: "rgba(255,255,255,0.06)" }}
                />
                <div
                  className="h-3 rounded-md"
                  style={{ width: "40%", background: "rgba(255,255,255,0.04)" }}
                />
                <div
                  className="h-3 rounded-md"
                  style={{ width: "80%", background: "rgba(255,255,255,0.04)" }}
                />
              </div>
            </div>
          ))}
          <p className="text-center text-gray-500 text-sm">
            AI is curating your perfect watchlist...
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          className="mt-4 p-3 rounded-xl text-center text-sm"
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#fca5a5",
          }}
        >
          {error}
        </div>
      )}

      {/* Results */}
      {!isLoading && recommendations.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="h-px flex-1"
              style={{ background: "rgba(206,206,251,0.1)" }}
            />
            <p className="text-gray-400 text-xs px-3">
              AI Recommendations for you
            </p>
            <div
              className="h-px flex-1"
              style={{ background: "rgba(206,206,251,0.1)" }}
            />
          </div>

          {recommendations.map((movie, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 rounded-xl group"
              style={{
                background: "rgba(15,13,35,0.9)",
                border: "1px solid rgba(206,206,251,0.07)",
                transition: "border-color 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)";
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(206,206,251,0.07)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              {/* Rank number */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  color: "white",
                }}
              >
                {index + 1}
              </div>

              {/* Movie info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <h3 className="text-white font-bold text-base leading-tight">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-gray-500 text-xs">
                        {movie.year}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: `${getGenreColor(movie.genre)}20`,
                          color: getGenreColor(movie.genre),
                          border: `1px solid ${getGenreColor(movie.genre)}40`,
                        }}
                      >
                        {movie.genre?.split(",")[0]?.trim()}
                      </span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-yellow-400 text-sm font-bold flex-shrink-0">
                    ⭐ {movie.rating}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">
                  {movie.reason}
                </p>
              </div>
            </div>
          ))}

          <p className="text-center text-gray-600 text-xs mt-4">
            Powered by Groq AI · Results may vary
          </p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && hasSearched && recommendations.length === 0 && !error && (
        <div className="text-center py-10">
          <p className="text-4xl mb-3">🎬</p>
          <p className="text-gray-400">
            No recommendations found. Try a different mood!
          </p>
        </div>
      )}
    </section>
  );
};

export default AIRecommender;
