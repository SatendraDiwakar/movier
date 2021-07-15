import React from 'react'
// react icons
import { BsImage } from 'react-icons/bs'
// style
import './ThumbnailCard.css'

export default function ThumbnailCard({ thumbnail, title }) {

    return <div className="thumbnail-card">
        <div className="thumbnail" >
            {thumbnail === "noPosterImage" ?
                <BsImage className="image-icon" style={{ fontSize: '6rem' }} />
                : <img src={thumbnail} alt="thumbnail" />
            }
        </div>
        <p className="name">{title}</p>
    </div>
}