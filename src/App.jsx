import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import MainContent from "./MainContent";
import SearchBar from "./navbar-components/SearchBar";
import NumResults from "./navbar-components/NumResults";
import MovieList from "./main-content-components/list-box-components/MovieList";
import MovieDisplayBox from "./main-content-components/MovieDisplayBox";
import WatchedMoviesSummary from "./main-content-components/watched-box-components/WatchedMoviesSummary";
import WatchedMoviesList from "./main-content-components/watched-box-components/WatchedMoviesList";
import Loader from "./shared/Loader";
import ErrorMessage from "./shared/ErrorMessage";
import MovieDatails from "./main-content-components/MovieDetails";
import { useMovies } from "./custom-hooks/useMovies";

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];


export default function App() {
  const [query, setQuery] = useState("");
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(function(){
    const storedValue = localStorage.getItem('watched')
    return JSON.parse(storedValue)
  });
  const [selectedMovieId, setSelectedMovieId] = useState(null)
  const {movies, isLoading, error} = useMovies(query)

  function handleSelectMovie(movieId){
    setSelectedMovieId(selectedMovieId => movieId === selectedMovieId ? null : movieId)
  }

  function handleCloseMovieDetails(){
    setSelectedMovieId(null)
  }

  function handleAddWatched(movie){
    setWatched(watched => [...watched, movie])
    // localStorage.setItem('watched', JSON.stringify([...watched, movie ]))
  }

  function handleDeleteWatched(movieId){
    setWatched(watched => watched.filter(movie => movie.imdbID !== movieId))

  }

  useEffect(function(){
    localStorage.setItem('watched', JSON.stringify(watched))
  }, [watched])

  

  return (
    <>
      <Navbar>
        <SearchBar query={query} setQuery={setQuery}/>
        <NumResults movies={movies} />
      </Navbar>
      <MainContent>
        <MovieDisplayBox>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
          {error && <ErrorMessage message={error} />}
        </MovieDisplayBox>
        <MovieDisplayBox>
          {selectedMovieId ? (
            <MovieDatails 
              movieId={selectedMovieId} 
              onCloseMovieDetails={handleCloseMovieDetails} 
              onAddWatched={handleAddWatched} 
              watched={watched}
            />
          ) :
          <>
            <WatchedMoviesSummary watched={watched} />
            <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched}/>
          </>
          }
        </MovieDisplayBox>
      </MainContent>
    </>
  );
}
