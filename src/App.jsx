import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import MainContent from "./MainContent";
import SearchBar from "./navbar-components/SearchBar";
import NumResults from "./navbar-components/NumResults";
import MovieList from "./main-content-components/list-box-components/MovieList";
import MovieDisplayBox from "./main-content-components/MovieDisplayBox";
import WatchedMoviesSummary from "./main-content-components/watched-box-components/WatchedMoviesSummary";
import WatchedMoviesList from "./main-content-components/watched-box-components/WatchedMoviesList";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const KEY = import.meta.env.VITE_KEY;

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const TempQuery = 'inception'


  useEffect(function(){
    async function fetchMovies() {
      try{
        setIsLoading(true)
        setError('') // reset error before fetching movies
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)

        if(!res.ok) throw new Error('Something went wrong with fetching movies')

        const data = await res.json()
        if (data.Response === 'False') throw new Error('Movie not found')

        setMovies(data.Search)
      } catch(err){
        console.log(err.message)
        setError(err.message)
      }finally{
        setIsLoading(false)
      }
    }
    if(query.length < 3){
      setMovies([])
      setError('')
      return
    }
    fetchMovies()
  }, [query])

  return (
    <>
      <Navbar>
        <SearchBar query={query} setQuery={setQuery}/>
        <NumResults movies={movies} />
      </Navbar>
      <MainContent>
        <MovieDisplayBox>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </MovieDisplayBox>
        <MovieDisplayBox>
          <WatchedMoviesSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </MovieDisplayBox>
      </MainContent>
      <StarRating maxRating={5} messages={['Terrible', 'Bad', 'Ok', 'Good', 'Amazing']}/>
      <StarRating maxRating={10} size={14} color="purple" defaultRating={5}/>
    </>
  );
}
