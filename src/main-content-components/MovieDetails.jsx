import { useEffect, useState } from "react";
import StarRating from "../StarRating";
import Loader from "../shared/Loader";
const KEY = import.meta.env.VITE_KEY;

export default function MovieDatails({ movieId, onCloseMovieDetails, onAddWatched, watched }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [userRating, setUserRating] = useState(0)

    const isWatched = watched.map(movie => movie.imdbID).includes(movieId)
    const watchedUserRating = watched.find(movie => movie.imdbID === movieId)?.userRating

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie;

    function handleAdd(){
        const newWatchedMovie = {
            imdbID: movieId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating
        }
        onAddWatched(newWatchedMovie)
        onCloseMovieDetails() // Close the detail after adding to the list
    }

    useEffect(function () {
        async function getMovieDetails() {
            setIsLoading(true)
            const res = await fetch(
                `http://www.omdbapi.com/?apikey=${KEY}&i=${movieId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false)
        }
        getMovieDetails();
    }, [movieId]);

    useEffect(function(){
        if(!title)return
        document.title = `usePopcorn | ${title}`

        return function(){
            document.title = 'usePopcorn'
        }
    }, [title])

    return (
        <div className="details">
            {isLoading && <Loader />}
            {!isLoading &&
            <>
            <header>
                <button className="btn-back" onClick={onCloseMovieDetails}>
                    &larr;
                </button>
                <img src={poster} alt={`poster of ${title} movie`}/>
                <div className="details-overview">
                    <h2>{title}</h2>
                    <p>
                        {released} &bull; {runtime}
                    </p>
                    <p>{genre}</p>
                    <p>{imdbRating} IMDb rating</p>
                </div>
            </header>
            <section>
                <div className="rating">
                {!isWatched ?
                (<>
                    <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
                    {<button className="btn-add" onClick={handleAdd} disabled={userRating === 0} >+ Add to list</button>}
                </>
                ):(
                <p>You have already rated this movie with: {watchedUserRating} <span>⭐</span></p>
                )
                } 
                </div>
                <p>Plot: <em>{plot}</em></p>
                <p>Starring: {actors}</p>
                <p>Directed by: {director}</p>
            </section>
            </>
            }
        </div>
    );
}
