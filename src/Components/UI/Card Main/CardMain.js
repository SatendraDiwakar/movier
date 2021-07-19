import React from 'react';
// react icons
import { BsImage } from 'react-icons/bs'
// style
import './CardMain.css'

export default function CardMain({ hero, styl }) {

    return <div className="card-main" style={{ ...styl }}>
        {hero === "noBackdropImage" ?
            <BsImage className="image-icon" />
            : <img src={hero} alt="" style={{ borderRadius: '25px', height: '100%' }} />
        }
    </div>
}