import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'

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
    
    return (
        <p>lol</p>
    )
}
