import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
import { GlobalContext } from "../context/GlobalState";
import TinderCard from "react-tinder-card";
// ICONS
import { IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";

export const Reel = (movie) => {
  // const movies =  [
  //     {
  //         name: "Mommy",
  //         url: "https://www.omdb.org/image/default/32322.jpeg?v=1",
  //         synopsis: "A widowed mother left to raise her violent son alone finds new hope when a mysterious neighbor becomes involved in her household.",
  //         rating: "8.1",
  //         genre: "Drama",
  //         length: "2:19h",
  //         country: "Canada",
  //         year: "2014",
  //         director: "Xavier Dolan",
  //         cast: "Anne Dorval, Antoine Olivier Pilon, Suzanne Clément",
  //         provider: "Amazon Prime",
  //     },
  //     {
  //         name: "Short Term 12",
  //         url: "https://www.omdb.org/image/default/30515.jpeg?v=1",
  //         synopsis: "A 20-something residential treatment facility employee navigates the troubled waters of this world with her co-worker and longtime boyfriend.",
  //         rating: "8.0",
  //         genre: "Drama",
  //         length: "1:36h",
  //         country: "United States",
  //         year: "2013",
  //         director: "Destin Daniel Cretton",
  //         cast: "Brie Larson, Frantz Turner, John Gallagher Jr.",
  //         provider: "Youtube, AppleTV",
  //     },
  //     {
  //         name: "Call me by your name",
  //         url: "https://www.omdb.org/image/default/40260.jpeg?v=1",
  //         synopsis: "In 1980s Italy, a romance develops between a seventeen-year-old student and an older man hired as his father's research assistant.",
  //         rating: "7.9",
  //         genre: "Drama, Romance",
  //         length: "2:10h",
  //         country: "Italy",
  //         year: "2017",
  //         director: "Luca Guadagnino",
  //         cast: "Armie Hammer, Timothée Chalamet, Michael Stuhlbarg",
  //         provider: "Netflix, Amazon Prime",
  //     },
  // ];

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(movies.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    const fetchMovies = () => {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
      )
        .then((result) => result.json())
        .then((data) => {
          if (!data.errors) {
            setMovies([...movies, ...data.results]);
            setCurrentIndex((currentIndex) => {
              return currentIndex + 20;
            });
            currentIndexRef.current += 20;
          } else {
            setMovies([]);
          }
        });
    };

    fetchMovies();
  }, [page]);

  console.log({ page, currentIndex });
  //   console.table(movies);

  const { addMovieToWatchList } = useContext(GlobalContext);

  const childRefs = useMemo(
    () =>
      Array(movies.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
    if (val === 3) {
      setPage((page) => {
        return page + 1;
      });
    }
  };

  const canGoBack = currentIndex < movies.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    console.log(lastDirection);
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    // console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    // currentIndexRef?.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < movies.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // GO BACK BUTTON: increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <>
      <div className="container">
        <div className="reel__cardContainer">
          {movies.map((movie, index) => (
            <TinderCard
              ref={childRefs[index]}
              key={movie.id}
              onSwipe={(dir) => swiped(dir, movie.id, index)}
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
              addMovieToWatchList(movie);
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
