import React from 'react'
//icons
import { AiOutlineYoutube, } from 'react-icons/ai'
// styles
import './MediaDetailsCard.css'

export default function MediaDetailsCard() {

    return <div className="MediaDetailsCard">
        <div className="info-container">
            <div className="plot">
                <p className="plot-heading">Plot</p>
                <div className="overview">
                    <p>
                        Natasha Romanoff, aka Black Widow, confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy, and the broken relationships left in her wake long before she became an Avenger.
                    </p>
                </div>
            </div>
            <div className="rating-container"><p>Rating: <span className="rating">{"4.2"}</span></p></div>
            <button className="trailer"><AiOutlineYoutube className="youtube-icon"/> Watch Trailer</button>
        </div>
    </div>
}