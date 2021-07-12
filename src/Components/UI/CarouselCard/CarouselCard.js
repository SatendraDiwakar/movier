import React from 'react'
// config
import { IMAGE_BASE_URL, BACKDROP_SIZE } from '../../../config';
// styles
import './CarouselCard.css'

export default function CarouselCard({ carouselItems }) {

    return <div className="CarouselContainer">
        <div className="carousel-items">
            {
                carouselItems.map((item, index) => {
                    return <div key={index} className="CarouselCard">
                        <img src={
                            IMAGE_BASE_URL + BACKDROP_SIZE + item.file_path
                        } alt="" />
                    </div>
                })
            }
        </div>
    </div>
}