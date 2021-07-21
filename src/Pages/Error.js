import React from 'react'
// react router
import { Link } from 'react-router-dom'

export default function Error() {
    return <div className="hero" >
        <div
            className="container container-item hero-content"
            style={{ height: '70vh' }}
        >
            <div className="error">
                <p>error, page not found</p>
                <div className="media-type-button-container" style={{border: 'none'}}>
                    <Link to="/" className="media-type-button"
                        style={{width:'150px',color:"#000"}}
                    >Back to Home
                    </Link>
                </div>
            </div>
        </div>
    </div>
}