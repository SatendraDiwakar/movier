import React from 'react';
// style
import './CardMain.css'

export default function CardMain({ hero, styl, showCarousel }) {

    return <div className="card-main" style={{ marginBottom: showCarousel ? '12rem' : '3rem', ...styl }}>
        <img src={hero} alt="" style={{ borderRadius: '25px', height: '100%' }} />
        {showCarousel &&
            <div className="carou">

            </div>
        }
    </div>
}