import React from 'react'
// react icons
import { BsImage } from 'react-icons/bs'
// custom hooks
import { useAnimateOnScroll } from '../../../hooks/useAnimateOnScroll';
// style
import './ThumbnailCard.css'

export default function ThumbnailCard({ listId, thumbnail, title, fromPage, loadMoreDone }) {

    const { addRevealThumb, thumbRef } = useAnimateOnScroll(listId, fromPage, loadMoreDone); // custom hook

    const revealElement = {
        animation: 'reveal 1s ease-in-out forwards'
    }

    return <div ref={thumbRef} className="thumbnail-card" style={addRevealThumb ? revealElement : null}>
        <div className="thumbnail" >
            {thumbnail === "noPosterImage" ?
                <BsImage className="image-icon" style={{ fontSize: '6rem' }} />
                : <img src={thumbnail} alt="thumbnail" />
            }
        </div>
        <p className="name">{title}</p>
    </div>
}