import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
import { GlobalContext } from "../context/GlobalState";
import TinderCard from "react-tinder-card";
// ICONS
import { IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";

export const Reel = (movie) => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(movies.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const { addMovieToWatchList, removeMovieFromWatchList, watched, watchlist } =
    useContext(GlobalContext);

  useEffect(() => {
    const fetchMovies = () => {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
      )
        .then((result) => result.json())
        .then((data) => {
          if (!data.errors) {
            const newMovies = data.results.filter(
              (movie) =>
                !(
                  watchlist.find(
                    (movieOnWatchList) => movieOnWatchList.id === movie.id
                  ) ||
                  watched.find(
                    (movieOnWatchedList) => movieOnWatchedList.id === movie.id
                  )
                )
            );
            setMovies(newMovies);
            setCurrentIndex(newMovies.length - 1);
          } else {
            setMovies([]);
          }
        });
    };

    fetchMovies();
  }, []);

  console.log(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(movies.length)
        .fill(0)
        .map((i) => React.createRef()),
    [movies]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < movies.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, movie, index) => {
    console.log(lastDirection);
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    if (direction === "right") {
      addMovieToWatchList(movie);
    }
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < movies.length) {
      try {
        await childRefs[currentIndex].current?.swipe(dir); // Swipe the card!
      } catch {}
    }
  };

  // GO BACK BUTTON: increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    removeMovieFromWatchList(movies[newIndex].id);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <>
      <div>
        <div className="reel__cardContainer">
          {movies.map((movie, index) => (
            <TinderCard
              ref={childRefs[index]}
              key={movie.id}
              onSwipe={(dir) => swiped(dir, movie, index)}
              onCardLeftScreen={() => outOfFrame(movie.id, index)}
              className="reel__swipe"
              preventSwipe={["up", "down"]}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title} Poster`}
              />
            </TinderCard>
          ))}
        </div>
        <div className="reel__swipeButtons">
          {/* UNDO BUTTON */}
          <IconButton
            className="reel_swipeButtonUndo"
            onClick={() => {
              goBack();
            }}
          >
            <SettingsBackupRestoreIcon fontSize="large" />
          </IconButton>
          {/* YES BUTTON */}
          <IconButton
            className="reel__swipeButtonYes"
            onClick={() => {
              swipe("right");
              addMovieToWatchList(movies[currentIndex]);
            }}
          >
            <ThumbUpIcon fontSize="large" />
          </IconButton>
          {/* NO BUTTON */}
          <IconButton
            className="reel_swipeButtonNno"
            onClick={() => {
              swipe("left");
            }}
          >
            <ThumbDownIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
    </>
  );
};
