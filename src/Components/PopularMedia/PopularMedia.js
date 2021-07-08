import React from 'react'
//  react router
import { Link } from 'react-router-dom'
// react icons
import { FaAngleRight } from 'react-icons/fa'
// config
import { POSTER_SIZE, IMAGE_BASE_URL } from '../../config';
// Component
import ThumbnailCard from '../UI/ThumbnailCard/ThumbnailCard'
// Image
import noImage from '../../Images/noImage.PNG'
// styles
import './PopularMedia.css'

export default function PopularMovies({ popularMedia, popularMediaHeading, mediaType }) {
   
    // scroll button functionality
    let scrollBy = 0;
    function handleClick() {
        let mediaContainer = document.getElementById(mediaType);
        scrollBy = mediaContainer.scrollLeft;
        if (scrollBy < mediaContainer.scrollWidth) {
            scrollBy += (window.innerWidth - 150);
            // need to changle the variable value from window.innerwidht to size of no. of visible thumbs
        }
        mediaContainer.scroll(scrollBy, 0)
    }

    return <div className="popular-media">
        <h2 className="popular-media-heading">{popularMediaHeading}</h2>
        <div className="popular-media-container" id={mediaType}>
            {
                popularMedia.results.map(item => {
                    return (
                        <div key={item.id} className="popular-media-card">
                            <Link to={`/${mediaType}/${item.id}/`}>
                                <ThumbnailCard id={item.id} thumbnail={
                                    item.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + item.poster_path : noImage
                                } />
                            </Link>
                            <p className="show-name">{item.title || item.name}</p>
                        </div>
                    )
                })
            }
        </div>
        <div className="right-angle-icon-container scroll-button" onClick={handleClick}>
            <FaAngleRight className="right-angle-icon" />
        </div>
    </div>
}