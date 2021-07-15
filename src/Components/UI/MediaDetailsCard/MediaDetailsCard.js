import React from 'react'
//icons
import { AiOutlineYoutube, } from 'react-icons/ai'
// styles
import './MediaDetailsCard.css'

export default function MediaDetailsCard({ overview, rating, video }) {

    function handleClick() {
        if (video === '') {
            alert("Trailer is Unavailable")
        }
    }

    return <div className="MediaDetailsCard">
        <div className="info-container">
            <div className="plot">
                <p className="plot-heading">Plot</p>
                <div className="overview">
                    <p>{overview}</p>
                </div>
            </div>
            <div className="rating-container"><p>Rating: <span className="rating">{rating}</span></p></div>
            <a href={video === '' ? null : video} onClick={handleClick} target="_blank" rel="noopener noreferrer" className="trailer"><AiOutlineYoutube className="youtube-icon" /> Watch Trailer</a>
        </div>
    </div>
}