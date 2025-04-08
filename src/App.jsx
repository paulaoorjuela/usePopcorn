import { useState } from "react";
import Navbar from "./Navbar";
import MainContent from "./MainContent";
import SearchBar from "./navbar-components/SearchBar";
import NumResults from "./navbar-components/NumResults";
import ListBox from "./main-content-components/ListBox";
import WatchedBox from "./main-content-components/WatchedBox";
import MovieList from "./main-content-components/list-box-components/MovieList";

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

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  
  return (
    <>
      <Navbar>
        <SearchBar/>
        <NumResults movies={movies}/>
      </Navbar>
      <MainContent>
        <ListBox>
          <MovieList movies={movies}/>
        </ListBox>
        <WatchedBox />
      </MainContent>
    </>
  );
}
