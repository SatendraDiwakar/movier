import React from 'react'
//  react router
import { FaAngleRight } from 'react-icons/fa'
// styles
import './List.css'

export default function List({ children, listHeading, listId }) {
   
    // scroll button functionality
    let scrollBy = 0;
    function handleClick() {
        let mediaContainer = document.getElementById(listId);
        scrollBy = mediaContainer.scrollLeft;
        if (scrollBy < mediaContainer.scrollWidth) {
            scrollBy += (window.innerWidth - 150);
            // need to changle the variable value from window.innerwidht to size of no. of visible thumbs
        }
        mediaContainer.scroll(scrollBy, 0)
    }

    return <div className="list">
        <h2 className="list-heading">{listHeading}</h2>
        <div className="list-container" id={listId}>
            {children}
        </div>
        <div className="right-angle-icon-container scroll-button" onClick={handleClick}>
            <FaAngleRight className="right-angle-icon" />
        </div>
    </div>
}