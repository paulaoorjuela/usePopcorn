import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
const KEY = import.meta.env.VITE_KEY;

export default function MovieDatails({ movieId, onCloseMovieDetails }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false)

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

    console.log(title, year);

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
                    <p><span>⭐</span>{imdbRating} IMDb rating</p>
                </div>
            </header>
            <section>
                <div>
                    <StarRating maxRating={10} size={24} defaultRating={5}/>
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
