import React, { useContext } from 'react';
// style
import './CardMain.css'

export default function CardMain({ hero, styl }) {

    return <div className="card-main" style={styl}>
        <img src={hero} alt="" style={{ height: '100%' }} />
    </div>
}