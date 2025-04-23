export default function MovieDatails({movieId, onCloseMovieDetails}){
    return <div className="detail">
        <button className="btn-back" onClick={onCloseMovieDetails}>&larr;</button>{movieId}</div>

}