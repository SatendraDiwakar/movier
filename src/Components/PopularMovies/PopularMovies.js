import React, { useContext } from 'react'

// config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../../config';

// Component
import MovieCard from '../UI/MovieCard/MovieCard'

// Image
import noImage from '../../Images/noImage.PNG'

// styles
import './PopularMovies.css'

export default function PopularMovies({popularMedia}) {

    console.log(popularMedia);

    return <div className="popular-movies">
        <h2 className="popular-movies-heading">Popular Movies</h2>
        <div className="popular-movies-container">
            {
                popularMedia.results.map(item => {
                    return (
                        <div key={item.id} className="popular-movies-card">
                            <MovieCard movieImage={
                                item.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + item.poster_path : noImage
                            } />
                            <p className="movie-name">{item.title || item.name}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
}