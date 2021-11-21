import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import "../css/ReelCards.css"
import ReactCardFlip from 'react-card-flip'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { IconButton } from "@mui/material";
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { movies } from './data';
import { watchList } from './data';

function ReelCards () {
    //---------FLIP CARD COMPONENT---------------------------------------------------------------
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
            setIsFlipped(!isFlipped);
    }

    //---------SWIPE CARD COMPONENT---------------------------------------------------------------
    const [currentIndex, setCurrentIndex] = useState(movies.length - 1)
    const [lastDirection, setLastDirection] = useState()
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)

    const childRefs = useMemo(
        () =>
      Array(movies.length)
        .fill(0)
            .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < movies.length - 1

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
        if (canSwipe && currentIndex < movies.length) {
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
    <div>
        <div className='cardContainer'>
            {movies.map((movie, index) => (
                <div className="sortCards">
                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" infinite="false">
                    {/* ---------FRONT--------------------------------------------------------------- */}
                    <TinderCard
                    className="swipe"
                    ref={childRefs[index]}
                    key={movie.name}
                    onSwipe={(dir) => swiped(dir, movie.name, index)}
                    onCardLeftScreen={() => outOfFrame(movie.name, index)}
                    preventSwipe={"up, left, right, down"}
                    >
                        <div
                        style={{ backgroundImage: 'url(' + movie.url + ')' }}
                        className='card'
                        >
                            <button onClick={handleClick}>MORE INFO</button>
                        </div>
                    </TinderCard>
                    {/* ---------BACK--------------------------------------------------------------- */}
                    <TinderCard>
                        <div className="reelCards__CardBack" key={movie.name}>
                            <IconButton onClick={handleClick}><ArrowBackIcon fontSize="large"/></IconButton>
                            <div className="back__name">{movie.name}</div>
                            <div className="back__synopsis">{movie.synopsis}</div>
                            <div className="back__flexbox">
                                <div className="back__rating">{movie.rating}</div>
                                <div className="back__flexbox2">
                                    <div>{movie.genre}</div>
                                    <div>{movie.length}</div>
                                    <div>{movie.country}, {movie.year}</div>
                                </div>
                            </div>
                            <div style={{fontWeight: "bold"}}>Cast & Crew</div>
                            <div>Director: {movie.director}</div>
                            <div>Starring: {movie.cast}</div>
                            <div style={{fontWeight: "bold"}}>Where to watch</div>
                            <div>{movie.provider}</div>
                            </div>
                    </TinderCard>
                </ReactCardFlip>
                </div>
        ))}
        </div>
      
        <div className="reelCards__swipeButtons">
            <IconButton className="swipeButtons__undo" onClick={() => {goBack()}}>
                <SettingsBackupRestoreIcon fontSize="large"/>
            </IconButton>
            <IconButton className="swipeButtons__yes" onClick={() => {swipe('right')}}>
                <ThumbUpIcon fontSize="large" />
            </IconButton>
            <IconButton className="swipeButtons__no" onClick={() => {swipe('left')}}>
                <ThumbDownIcon fontSize="large" />
            </IconButton>
        </div>
        <div>{watchList}</div>
    </div>
  )
}

export default ReelCards