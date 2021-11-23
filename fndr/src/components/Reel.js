import React, {useContext, useState, useRef, useMemo} from 'react'
import { GlobalContext } from '../context/GlobalState'
import TinderCard from "react-tinder-card"
// ICONS
import { IconButton } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { ResultCard } from './ResultCard';

export const Reel = (movie) => {
    const [results, setResults] = useState([]);

        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false`
            ).then((result) => result.json())
            .then(data => {
                if(!data.errors) {
                    setResults(data.results);
                } else {
                    setResults([]);
                }
            });


    const { addMovieToWatchList, removeMovieFromWatchList } = useContext(GlobalContext)

    const [currentIndex, setCurrentIndex] = useState(results.length - 1)
    const [lastDirection, setLastDirection] = useState()
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)

    const childRefs = useMemo(
        () =>
      Array(results.length)
        .fill(0)
            .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < results.length - 1

    const canSwipe = currentIndex >= 0

    // set last direction and decrease current index
    const swiped = (direction, nameToDelete, index) => {
        console.log(lastDirection);
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (name, idx) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    }

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < results.length) {
        await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    }

    // GO BACK BUTTON: increase current index and show card
    const goBack = async () => {
        if (!canGoBack) return
        const newIndex = currentIndex + 1
        updateCurrentIndex(newIndex)
        await childRefs[newIndex].current.restoreCard()
    }
    
    return (
    <>
        <div className="container">
            <div className="reel__cardContainer">
                {results.map((movie, index) => (
                    <TinderCard
                    ref={childRefs[index]}
                    key={movie.id}
                    onSwipe={(dir) => swiped(dir, movie.name, index)}
                    onCardLeftScreen={() => outOfFrame(movie.name, index)}
                    className="reel__swipe"
                    preventSwipe={["up", "down"]}
                    >
                    <div>
                    {movie.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={`${movie.title} Poster`}
                    />
                ) 
                : 
                (<div className="filler-poster"></div>) //show a filler Image in case there is no movie poster
                }
                    </div>
                    </TinderCard>
            
                ))}
            </div>
            <div className="reel__swipeButtons">
                {/* UNDO BUTTON */}
                <IconButton className="reel_swipeButtonUndo" onClick={() => {{goBack()}; removeMovieFromWatchList(movie)}}>
                    <SettingsBackupRestoreIcon fontSize="large"/>
                </IconButton>
                {/* YES BUTTON */}
                <IconButton className="reel__swipeButtonYes" onClick={() => {{swipe('right')}; addMovieToWatchList(movie)}}>
                    <ThumbUpIcon fontSize="large" />
                </IconButton>
                {/* NO BUTTON */}
                <IconButton className="reel_swipeButtonNno"onClick={() => {swipe('left')}}>
                    <ThumbDownIcon fontSize="large" />
                </IconButton>
            </div>
        </div>
    </>
    )
}
