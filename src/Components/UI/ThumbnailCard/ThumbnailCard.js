import React from 'react'
import './ThumbnailCard.css'

export default function MovieCard({ thumbnail }) {

    return <div className="thumbnail" >
        <img src={thumbnail} alt="thumbnail" />
    </div>
}