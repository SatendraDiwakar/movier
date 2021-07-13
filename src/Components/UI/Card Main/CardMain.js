import React from 'react';
// style
import './CardMain.css'

export default function CardMain({ hero, styl, showCarousel }) {
    
    return <div className="card-main" style={{...styl }}>
        <img src={hero} alt="" style={{ borderRadius: '25px', height: '100%' }} />
    </div>
}