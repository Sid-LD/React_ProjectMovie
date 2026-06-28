import React, { useEffect, useState } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
import Navbar from './components/Navbar.jsx'
import AuthModal from './components/AuthModal.jsx'
import MovieDetailModal from './components/MovieDetailModal.jsx'
import WatchlistPage from './components/WatchlistPage.jsx'
import MovieChatbot from './components/MovieChatbot.jsx'
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './appwrite.js'
import { getWatchlist } from './appwriteAuth.js'
import { useAuth } from './context/AuthContext.jsx'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    },
}

const App = () => {
    const { user } = useAuth()

    const [searchTerm, setSearchTerm] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [movieList, setMovieList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
    const [trendingMovies, setTrendingMovies] = useState([])

    const [showAuthModal, setShowAuthModal] = useState(false)
    const [showWatchlist, setShowWatchlist] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [watchlist, setWatchlist] = useState([])

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

    const fetchMovies = async (query = '') => {
        setErrorMessage('')
        setIsLoading(true)
        try {
            const endpoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

            const response = await fetch(endpoint, API_OPTIONS)
            if (!response.ok) throw new Error('Failed to fetch movies')

            const data = await response.json()
            if (data.Response === 'False') {
                setErrorMessage(data.Error || 'Failed to fetch movies')
                setMovieList([])
                return
            }
            setMovieList(data.results)

            if (query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0])
            }
        } catch (error) {
            console.error(`Error while fetching movies: ${error}`)
            setErrorMessage('Error fetching movies, please try again')
        } finally {
            setIsLoading(false)
        }
    }

    const loadTrendingMovies = async () => {
        try {
            const movies = await getTrendingMovies()
            setTrendingMovies(movies)
        } catch (error) {
            console.error(error)
        }
    }

    const loadWatchlist = async () => {
        if (!user) { setWatchlist([]); return }
        try {
            const docs = await getWatchlist(user.$id)
            setWatchlist(docs)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => { fetchMovies(debouncedSearchTerm) }, [debouncedSearchTerm])
    useEffect(() => { loadTrendingMovies() }, [])
    useEffect(() => { loadWatchlist() }, [user])

    const handleWatchlistChange = (delta) => {
        // Refresh full watchlist after change
        loadWatchlist()
    }

    const handleRemoveFromWatchlist = (docId) => {
        setWatchlist((prev) => prev.filter((item) => item.$id !== docId))
    }

    return (
        <main>
            <div className="pattern" />

            <div className="wrapper">
                <Navbar
                    onAuthClick={() => setShowAuthModal(true)}
                    onWatchlistClick={() => setShowWatchlist(true)}
                    watchlistCount={watchlist.length}
                />

                <header>
                    <img src="/hero.png" alt="Hero Banner" />
                    <h1>
                        Find <span className="text-gradient">Movies</span> You will enjoy without the hassle
                    </h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>

                {trendingMovies && trendingMovies.length > 0 && (
                    <section className="trending">
                        <h2>Trending Movies</h2>
                        {isLoading ? (
                            <p className="text-zinc-200"><Spinner /></p>
                        ) : errorMessage ? (
                            <p className="text-red-700">{errorMessage}</p>
                        ) : (
                            <ul>
                                {trendingMovies && trendingMovies.map((movie, index) => (
                                    <li key={movie.$id}>
                                        <p>{index + 1}</p>
                                        <img src={movie.poster_url} alt={movie.title} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                )}

                <section className="all-movies">
                    <h2>All Movies</h2>
                    {isLoading ? (
                        <p className="text-zinc-300"><Spinner /></p>
                    ) : errorMessage ? (
                        <p className="text-red-600">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    onClick={() => setSelectedMovie(movie)}
                                />
                            ))}
                        </ul>
                    )}
                </section>
            </div>

            {/* Modals */}
            {showAuthModal && (
                <AuthModal onClose={() => setShowAuthModal(false)} />
            )}

            {selectedMovie && (
                <MovieDetailModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                    onWatchlistChange={handleWatchlistChange}
                />
            )}

            {showWatchlist && (
                <WatchlistPage
                    watchlist={watchlist}
                    onClose={() => setShowWatchlist(false)}
                    onRemove={handleRemoveFromWatchlist}
                />
            )}

            {/* AI Movie Chatbot */}
            <MovieChatbot />
        </main>
    )
}

export default App
