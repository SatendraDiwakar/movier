import React from 'react'
// style
import './ActorCard.css'

export default function ActorCard({ actorImg, actorName }) {

    return <div className="actor-card-container" >
        <div className="actor-card">
            <img src={actorImg} alt={actorName} />
        </div>
        <p className="cast-name">{actorName}</p>
    </div>
}