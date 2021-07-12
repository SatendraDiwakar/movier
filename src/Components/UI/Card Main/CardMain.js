import React from 'react';
// style
import './CardMain.css'
// component
import CarouselCard from '../CarouselCard/CarouselCard';

export default function CardMain({ hero, styl, showCarousel, carouselItems }) {
    
    return <div className="card-main" style={{ marginBottom: showCarousel ? '12rem' : '3rem', ...styl }}>
        <img src={hero} alt="" style={{ borderRadius: '25px', height: '100%' }} />
        {showCarousel &&
            <>
            <CarouselCard carouselItems={carouselItems}/>
            </>
        }
    </div>
}