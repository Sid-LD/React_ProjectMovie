# 🎬 CineSearch

A modern, full-stack movie discovery app built with React and Appwrite. Search thousands of movies, explore trending titles, view full movie details with trailers, and sign in to manage your experience.

🔗 **Live Demo:** [your-deployed-link-here]

---

## 📸 Screenshots

> _Add screenshots of your app here after deployment_
> Tip: Press `F12` → `Ctrl+Shift+M` in Chrome to capture a nice mobile view too

---

## ✨ Features

- 🔍 **Smart Search** — Debounced search across thousands of movies via TMDB API
- 🔥 **Trending Movies** — Tracks most-searched movies in real time using Appwrite
- 🎥 **Movie Detail Modal** — Click any movie to see full details: cast, synopsis, genres, runtime, budget, and an embedded YouTube trailer
- 🔐 **Authentication** — Sign up and sign in with email/password via Appwrite Auth
- 📱 **Fully Responsive** — Works beautifully on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| **React 18** | Frontend UI |
| **Vite** | Build tool & dev server |
| **Tailwind CSS v4** | Styling |
| **Appwrite** | Database (trending searches) + Authentication |
| **TMDB API** | Movie data, posters, trailers, cast |
| **react-use** | Debounce hook for search |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- An Appwrite account → [appwrite.io](https://appwrite.io)
- A TMDB API key → [themoviedb.org](https://www.themoviedb.org/settings/api)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/cinesearch.git

# Navigate into the project
cd cinesearch/react

# Install dependencies
npm install

# Create environment variables file
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the `react/` folder with the following:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗂️ Project Structure

```
react/
├── public/
│   ├── hero.png
│   ├── hero-bg.png
│   └── star.svg
├── src/
│   ├── components/
│   │   ├── AuthModal.jsx       # Login / Sign up modal
│   │   ├── MovieCard.jsx       # Movie card with click to open detail
│   │   ├── MovieDetailModal.jsx # Full movie details + trailer
│   │   ├── Navbar.jsx          # Navigation with auth state
│   │   ├── Search.jsx          # Search input with debounce
│   │   └── Spinner.jsx         # Loading spinner
│   ├── context/
│   │   └── AuthContext.jsx     # Global auth state
│   ├── App.jsx                 # Main app component
│   ├── appwrite.js             # Appwrite database functions
│   ├── appwriteAuth.js         # Appwrite auth functions
│   └── index.css               # Global styles + Tailwind
├── .env.local                  # Environment variables (not committed)
└── vite.config.js
```

---

## 🔧 Appwrite Setup

1. Create a new project on [Appwrite Cloud](https://cloud.appwrite.io)
2. Create a new **Database**
3. Create a **Collection** with these attributes:
   - `searchTerm` — String
   - `count` — Integer
   - `movie_id` — Integer
   - `poster_url` — String
4. Set collection permissions to allow read/write
5. Copy your Project ID, Database ID, and Collection ID into `.env.local`

---

## 🌐 Deployment

This app is deployed on **Vercel / Netlify**.

To deploy your own:
1. Push your code to GitHub
2. Import the repo on [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
3. Add your environment variables in the dashboard
4. Deploy!

---

## 🙋‍♂️ Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-profile)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
