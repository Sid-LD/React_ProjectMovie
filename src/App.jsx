// const Card=({actors})=>{
//   return(
//     <div>
//       {actors.map((actor, index) => (
//         <h2 key={index}>I like {actor.name}</h2>
//       ))}
//     </div>
//   )
// }


// const App=()=>{
  //   return(
//     <div>
//       <h1>Hello world</h1>
//       <Card title="Avatar" actors={[{name:"Kiara Advani"},{name:"Alia Bhatt"}]}/>


//     </div>
//   )
// }

// export default App



// const Card=({title})=>{
  //   return(
    //     <div className="card" style={ //inline styling
    //       {
      //         border:"1px"
      //       }
//     }>
//       <h2>{title}</h2>
//     </div>
//   )
// }




import React, { useEffect } from 'react'
import Search from './components/Search.jsx'
import { useState } from 'react'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './appwrite.js'

const API_BASE_URL="https://api.themoviedb.org/3"

const API_KEY=import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS={
  method:"GET",
  headers:{
    accept:"application/json",
    Authorization:`Bearer ${API_KEY}`
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('') //you cannot change state variables
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [trendingMovies, setTrendingMovies] = useState([])

  //Debounce the search term to prevent making too many API request
  //by waiting for the user to stop typing for 500ms
  //We are debouncing the input field
  useDebounce(()=> setDebouncedSearchTerm(searchTerm),500,[searchTerm])

  const fetchMovies=async(query='')=>{
    setErrorMessage('')
    setIsLoading(true)
    try {
      const endpoint=query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc` // Builds the API URL for  discovering movies, sorted by popularity (most popular first)

      const response=await fetch(endpoint,API_OPTIONS) //// Sends a GET request to that URL, using your API key for authorization
      //returns a response object
      if(!response.ok){
        throw new Error("Failed to fetch movies")
      }
      

      const data=await response.json()//parses the json string from respose object and returns a usable js object
      
      if(data.Response=="False"){
        setErrorMessage(data.Error || "Failed to fetch movies")
        setMovieList([])
        return
      }
      
      setMovieList(data.results)
      
      if(query && data.results.length>0){
        await updateSearchCount(query,data.results[0])
      }
    } catch (error) {
      console.error(`Error while fetching movies: ${error}`)
      setErrorMessage("Error fetching movies, please try again")
      
    }
    finally{
      setIsLoading(false)
    }
  }

  const loadTrendingMovies=async()=>{
    try {
      
      const movies=await getTrendingMovies()
      setTrendingMovies(movies)

    } catch (error) {
      console.error(error)
      
    }
  }

  useEffect(()=>{
    fetchMovies(debouncedSearchTerm)
  },[debouncedSearchTerm])

  useEffect(()=>{
    loadTrendingMovies()
  },[])
  return (
    <main>

      <div className='pattern'/>

      <div className='wrapper'>
        <header>
          <img src="/hero.png" alt="Hero Banner" />
        <h1>Find <span className='text-gradient'>Movies</span> You will enjoy without the hassle</h1>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        
        {trendingMovies.length>0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>

            {/* <ul>
              {trendingMovies.map((movie, index)=>{
                return <>
                <li key={movie.$id}>
                  <p>{index+1}</p>
                  <img src={movie.poster_url} alt="" />
                  
                </li>
                
                </>
              })}
            </ul> */}
            {isLoading?(
              <p className='text-zinc-200'><Spinner/></p>
            ): errorMessage?(
              <p className='text-red-700'>{errorMessage}</p>
            ): (
              <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>

            )}

          </section>
        )}





        <section className='all-movies'>
          <h2>All movies</h2>
          {isLoading?(
            <p className='text-zinc-300'><Spinner/></p>
          ) : errorMessage?(
            <p className='text-red-600'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie)=>(
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )
          
          }
        </section>
      </div>
    </main>
  )
}

export default App
