import React, {createContext, useReducer, useEffect} from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
    watchlist: localStorage.getItem("watchlist") ? JSON.parse(localStorage.getItem("watchlist")) : [],
    watched: localStorage.getItem("watched") ? JSON.parse(localStorage.getItem("watched")) : [],
}

// create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = props => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist))
        localStorage.setItem("watched", JSON.stringify(state.watched))
    }, [state]);

    // Actions
    const addMovieToWatchList = movie => {
        dispatch({type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
    };

    const removeMovieFromWatchList = (id) => {
        dispatch({type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id}); 
    };

    const addMovieToWatched = (movie) => {
        dispatch({type: "ADD_MOVIE_TO_WATCHED", payload: movie});
    };

    const moveToWatchList = movie => {
        dispatch({type: "MOVE_TO_WATCHLIST", payload: movie});
    };

    const removeMovieFromWatched = (id) => {
        dispatch({type: "REMOVE_MOVIE_FROM_WATCHED", payload: id});
    };

    return (
        <GlobalContext.Provider 
            value={{
                watchlist: state.watchlist, 
                watched: state.watched, 
                addMovieToWatchList: addMovieToWatchList,
                removeMovieFromWatchList: removeMovieFromWatchList,
                addMovieToWatched: addMovieToWatched,
                moveToWatchList: moveToWatchList,
                removeMovieFromWatched: removeMovieFromWatched,
            }}>
            {props.children}
        </GlobalContext.Provider>
    )
}