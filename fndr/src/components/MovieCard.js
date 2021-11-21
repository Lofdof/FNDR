import React from 'react'
import { MovieControls } from './MovieControls'

// MOVIECARD THAT IS SHOWN IN WATCHLIST & WATCHED

export const MovieCard = ({ movie, type}) => {
    return (
        <div className="movie-card">
            <div className="overlay"></div>

            {movie.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={`${movie.title} Poster`}
                    />
                ) 
                : 
                (<div className="filler-poster"></div>) //show a filler Image in case there is no movie poster
                }

            <MovieControls type={type} movie={movie}/>

        </div>
    )
}
