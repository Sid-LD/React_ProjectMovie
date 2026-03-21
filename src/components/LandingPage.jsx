import { useState, useEffect } from "react";

const LandingPage = ({ onEnter }) => {
  const [visible, setVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const features = [
    {
      icon: "🔍",
      title: "Smart Search",
      desc: "Search thousands of movies instantly with real-time debounced results",
    },
    {
      icon: "🔥",
      title: "Trending Now",
      desc: "See what everyone is searching, powered by live Appwrite data",
    },
    {
      icon: "🎬",
      title: "Movie Details",
      desc: "Full cast, trailers, synopsis and ratings in a beautiful modal",
    },
    {
      icon: "🤖",
      title: "AI Recommender",
      desc: "Describe your mood — Groq AI picks the perfect movie for you",
    },
    {
      icon: "🔐",
      title: "Auth System",
      desc: "Sign up and sign in securely with Appwrite authentication",
    },
    {
      icon: "⭐",
      title: "Ratings & Info",
      desc: "TMDB-powered ratings, genres, runtime and release data",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#030014",
        fontFamily: "'DM Sans', sans-serif",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Animated background orbs */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
            top: -200,
            left: -200,
            animation: "float1 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)",
            top: 100,
            right: -150,
            animation: "float2 10s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
            bottom: 100,
            left: "40%",
            animation: "float3 12s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,40px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,30px)} }
        @keyframes float3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.5);opacity:0} }
        .cta-btn:hover { transform: scale(1.05) !important; box-shadow: 0 20px 50px rgba(124,58,237,0.5) !important; }
        .cta-btn { transition: all 0.3s ease !important; }
        .feature-card:hover { transform: translateY(-4px) !important; border-color: rgba(139,92,246,0.4) !important; background: rgba(139,92,246,0.08) !important; }
        .feature-card { transition: all 0.3s ease !important; }
        .nav-btn:hover { background: rgba(139,92,246,0.15) !important; }
        .nav-btn { transition: all 0.2s ease !important; }
      `}</style>

      {/* Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 40px",
          background: "rgba(3,0,20,0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(206,206,251,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }}>🎬</span>
          <span
            style={{
              color: "white",
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: "-0.5px",
            }}
          >
            CineSearch
          </span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            className="nav-btn"
            onClick={onEnter}
            style={{
              background: "transparent",
              border: "1px solid rgba(206,206,251,0.15)",
              color: "rgba(206,206,251,0.8)",
              padding: "8px 20px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Sign In
          </button>
          <button
            className="cta-btn"
            onClick={onEnter}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              border: "none",
              color: "white",
              padding: "8px 20px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Browse Movies
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px 80px",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(124,58,237,0.12)",
            border: "1px solid rgba(124,58,237,0.3)",
            borderRadius: 100,
            padding: "6px 16px",
            marginBottom: 32,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <span style={{ fontSize: 12 }}>✨</span>
          <span style={{ color: "#c4b5fd", fontSize: 13, fontWeight: 500 }}>
            Powered by AI · Groq + Llama 3.3
          </span>
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontSize: "clamp(48px, 8vw, 88px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-2px",
            margin: "0 0 24px",
            maxWidth: 800,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease 0.1s",
          }}
        >
          <span style={{ color: "white" }}>Discover Movies</span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #c4b5fd, #818cf8, #a78bfa)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 4s linear infinite",
            }}
          >
            You'll Actually Love
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: "rgba(206,206,251,0.6)",
            fontSize: "clamp(16px, 2vw, 20px)",
            maxWidth: 560,
            lineHeight: 1.7,
            margin: "0 0 48px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease 0.2s",
          }}
        >
          Search thousands of movies, get AI-powered recommendations based on
          your mood, and explore trending titles — all in one place.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease 0.3s",
          }}
        >
          <button
            className="cta-btn"
            onClick={onEnter}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              border: "none",
              color: "white",
              padding: "16px 36px",
              borderRadius: 12,
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 700,
              boxShadow: "0 10px 30px rgba(124,58,237,0.35)",
            }}
          >
            🎬 Start Exploring
          </button>
          <button
            className="nav-btn"
            onClick={onEnter}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(206,206,251,0.15)",
              color: "rgba(206,206,251,0.8)",
              padding: "16px 36px",
              borderRadius: 12,
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            🤖 Try AI Recommender
          </button>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 48,
            marginTop: 72,
            flexWrap: "wrap",
            justifyContent: "center",
            opacity: visible ? 1 : 0,
            transition: "all 0.7s ease 0.5s",
          }}
        >
          {[
            { value: "1M+", label: "Movies & Shows" },
            { value: "AI", label: "Powered Picks" },
            { value: "Free", label: "No Credit Card" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  margin: 0,
                  background: "linear-gradient(135deg, #c4b5fd, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  color: "rgba(206,206,251,0.5)",
                  fontSize: 14,
                  margin: "4px 0 0",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "80px 24px 120px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2
            style={{
              color: "white",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              margin: "0 0 16px",
              letterSpacing: "-1px",
            }}
          >
            Everything you need
          </h2>
          <p
            style={{ color: "rgba(206,206,251,0.5)", fontSize: 18, margin: 0 }}
          >
            Built with React, Appwrite, TMDB API and Groq AI
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card"
              style={{
                background: "rgba(206,206,251,0.03)",
                border: "1px solid rgba(206,206,251,0.08)",
                borderRadius: 16,
                padding: "28px 24px",
                cursor: "default",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  marginBottom: 16,
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: 700,
                  margin: "0 0 8px",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: "rgba(206,206,251,0.5)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "0 24px 100px",
        }}
      >
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            padding: "60px 40px",
            background: "rgba(124,58,237,0.08)",
            border: "1px solid rgba(124,58,237,0.2)",
            borderRadius: 24,
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: 36,
              fontWeight: 800,
              margin: "0 0 16px",
              letterSpacing: "-1px",
            }}
          >
            Ready to find your next
            <br />
            favorite movie?
          </h2>
          <p
            style={{
              color: "rgba(206,206,251,0.5)",
              fontSize: 16,
              margin: "0 0 32px",
              lineHeight: 1.7,
            }}
          >
            Join thousands of movie lovers discovering films they actually
            enjoy.
          </p>
          <button
            className="cta-btn"
            onClick={onEnter}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              border: "none",
              color: "white",
              padding: "16px 48px",
              borderRadius: 12,
              cursor: "pointer",
              fontSize: 17,
              fontWeight: 700,
              boxShadow: "0 10px 30px rgba(124,58,237,0.4)",
            }}
          >
            🎬 Get Started — It's Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "24px",
          borderTop: "1px solid rgba(206,206,251,0.06)",
          color: "rgba(206,206,251,0.3)",
          fontSize: 13,
        }}
      >
        Built with ❤️ using React · Appwrite · TMDB · Groq AI
      </footer>
    </div>
  );
};

export default LandingPage;
