import React from 'react'

//  react router
import { Link } from 'react-router-dom'

// style
import './ThumbnailCard.css'

export default function MovieCard({ thumbnail }) {

    return <div className="thumbnail" >
        <Link to="/">
            <img src={thumbnail} alt="thumbnail" />
        </Link>
    </div>
}