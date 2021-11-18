import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const ResultCard = ({movie}) => {
    const { addMovieToWatchList, addMovieToWatched, watchlist, watched } = useContext(GlobalContext)

    let storedMovie = watchlist.find(object => object.id === movie.id);
    let storedMovieWatched = watched.find(object => object.id === movie.id);

    const watchlistDisabled = storedMovie ? true : storedMovieWatched ? true: false;
    const watchedDisabled = storedMovieWatched ? true : false;

    return (
        <div className="result-card">
            <div className="poster-wrapper">
                {movie.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={`${movie.title} Poster`}
                    />
                ) 
                : 
                (<div className="filler-poster"></div>) //show a filler Image in case there is no movie poster
                }
            </div>
            <div className="info">
                <div className="Header">
                    <h3 className="title">{movie.title}</h3>
                    <h4 className="release-date">
                        {movie.release_date ? movie.release_date.substring(0,4) : "-"}
                    </h4>
                </div>

                <div className="controls">
                    <button 
                    className="btn" 
                    onClick={() => addMovieToWatchList(movie)}
                    disabled={watchlistDisabled}
                    >
                    Add to WatchList
                    </button>

                    <button 
                    className="btn" 
                    onClick={() => addMovieToWatched(movie)}
                    disabled={watchedDisabled}
                    >
                    Add to Watched
                    </button>
                </div>
            </div>
        </div>
    )
}
