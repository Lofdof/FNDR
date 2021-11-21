import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'

// BUTTONS TO WATCHLIST & TO WATCHED LIST

export const MovieControls = ({movie, type}) => {
    const {removeMovieFromWatchList, addMovieToWatched, moveToWatchList, removeMovieFromWatched} = useContext(GlobalContext);
    return (
        <div className="inner-card-controls">
            {/* WATCHLIST-BUTTONS */}
            {type === "watchlist" && (
                <>
                    {/* BUTTON: MOVE TO WATCHED-LIST */}
                    <button className="ctrl-btn" onClick={() => addMovieToWatched(movie)}>
                        <i className="fa-fw far fa-eye"></i>
                    </button>
                    {/* BUTTON: REMOVE FROM WATCHLIST */}
                    <button className="ctrl-btn" onClick={() => removeMovieFromWatchList(movie.id)}> 
                        <i className="fa-fw fa fa-times"></i>
                    </button>
                </>
            )}
            {/* WATCHED-BUTTONS */}
            {type === "watched" && (
                <>
                    {/* BUTTON: MOVE BACK TO WATCHLIST */}
                    <button className="ctrl-btn" onClick={() => moveToWatchList(movie)}>
                        <i className="fa-fw far fa-eye-slash"></i>
                    </button>
                    {/* BUTTON: REMOVE FROM WATCHED */}
                    <button className="ctrl-btn" onClick={() => removeMovieFromWatched(movie.id)}> 
                        <i className="fa-fw fa fa-times"></i>
                    </button>
                </>
            )}
        </div>
    )
}
