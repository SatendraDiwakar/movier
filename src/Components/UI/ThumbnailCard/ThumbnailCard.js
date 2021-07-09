import React from 'react'
// style
import './ThumbnailCard.css'

export default function ThumbnailCard({ thumbnail, title }) {

    return <div className="thumbnail-card">
        <div className="thumbnail" >
            <img src={thumbnail} alt="thumbnail" />
        </div>
        <p className="name">{title}</p>
    </div>
}