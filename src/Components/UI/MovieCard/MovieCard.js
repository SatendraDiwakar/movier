import React from 'react'
import './MovieCard.css'

export default function MovieCard({ movieImage }) {

    return <div className="movie-card" >
        <img src={movieImage} alt="image" />
    </div>
}