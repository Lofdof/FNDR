import React, {useContext, useState, useRef, useMemo} from 'react'
import { GlobalContext } from '../context/GlobalState'
import TinderCard from "react-tinder-card"
// ICONS
import { IconButton } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

export const Reel = () => {
    const movies =  [
        {
            name: "Call me by your name",
            url: "https://www.omdb.org/image/default/40260.jpeg?v=1",
            synopsis: "In 1980s Italy, a romance develops between a seventeen-year-old student and an older man hired as his father's research assistant.",
            rating: "7.9",
            genre: "Drama, Romance",
            length: "2:10h",
            country: "Italy",
            year: "2017",
            director: "Luca Guadagnino",
            cast: "Armie Hammer, Timothée Chalamet, Michael Stuhlbarg",
            provider: "Netflix, Amazon Prime",
        },
        {
            name: "Mommy",
            url: "https://www.omdb.org/image/default/32322.jpeg?v=1",
            synopsis: "A widowed mother left to raise her violent son alone finds new hope when a mysterious neighbor becomes involved in her household.",
            rating: "8.1",
            genre: "Drama",
            length: "2:19h",
            country: "Canada",
            year: "2014",
            director: "Xavier Dolan",
            cast: "Anne Dorval, Antoine Olivier Pilon, Suzanne Clément",
            provider: "Amazon Prime",
        },
        {
            name: "Short Term 12",
            url: "https://www.omdb.org/image/default/30515.jpeg?v=1",
            synopsis: "A 20-something residential treatment facility employee navigates the troubled waters of this world with her co-worker and longtime boyfriend.",
            rating: "8.0",
            genre: "Drama",
            length: "1:36h",
            country: "United States",
            year: "2013",
            director: "Destin Daniel Cretton",
            cast: "Brie Larson, Frantz Turner, John Gallagher Jr.",
            provider: "Youtube, AppleTV",
        },
    ];

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
    <>
        <div className="container">
            <div className="reel__cardContainer">
                {movies.map((movie, index) => (
                    <TinderCard
                    ref={childRefs[index]}
                    key={movie.name}
                    onSwipe={(dir) => swiped(dir, movie.name, index)}
                    onCardLeftScreen={() => outOfFrame(movie.name, index)}
                    className="reel__swipe"
                    key={movie.name}
                    preventSwipe={["up", "down"]}
                    >
                    <div
                    style={{ backgroundImage: `url(${movie.url})`}}
                    className="reel__card"
                    >
                    </div>
                    </TinderCard>
            
                ))}
            </div>
            <div className="reel__swipeButtons">
                {/* UNDO BUTTON */}
                <IconButton className="reel_swipeButtonUndo" onClick={() => {goBack()}}>
                    <SettingsBackupRestoreIcon fontSize="large"/>
                </IconButton>
                {/* YES BUTTON */}
                <IconButton className="reel__swipeButtonYes" onClick={() => {swipe('right')}}>
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
