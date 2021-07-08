import React from 'react'

// style
import './ThumbnailCard.css'

export default function MovieCard({ thumbnail }) {

    return <div className="thumbnail" >
        <img src={thumbnail} alt="thumbnail" />
    </div>
}