import React, { useEffect } from 'react'
//  react router
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
// styles
import './List.css'

export default function List({ children, listHeading, listId, showIcon, styl }) {

    // left scroll button unhide
    useEffect(() => {
        let mediaContainer = document.getElementById(listId);
        let leftScrollButton = document.getElementsByClassName("left-angle-icon-container")[0];
        if (mediaContainer.scrollLeft === 0) {
            leftScrollButton.style = "visibility: hidden";
        }
        mediaContainer.addEventListener('scroll', () => {
            if (mediaContainer.scrollLeft === 0) {
                leftScrollButton.style = "visibility: hidden";
            } else {
                leftScrollButton.style = "visibility: visible";
            }
        })
    }, [listId])

    // scroll button functionality
    let scrollBy = 0;
    function handleClick(direction) {
        let thumbWidth = document.getElementsByClassName("thumbnail")[0].offsetWidth;
        let mediaContainer = document.getElementById(listId);
        scrollBy = mediaContainer.scrollLeft;
        if (direction === 'right') {
            if (scrollBy < mediaContainer.scrollWidth) {
                if (mediaContainer.offsetWidth < 250) {
                    scrollBy += thumbWidth;
                } else {
                    scrollBy += (mediaContainer.offsetWidth - (thumbWidth / 2));
                }
            }
        }else if(direction === 'left'){
            if (scrollBy !== 0) {
                if (mediaContainer.offsetWidth < 250) {
                    scrollBy -= thumbWidth;
                } else {
                    scrollBy -= (mediaContainer.offsetWidth - (thumbWidth / 2));
                }
            }
        }
        mediaContainer.scroll(scrollBy, 0)
    }

    return <div className="list">
        <h2 className="list-heading">{listHeading}</h2>
        <div className="list-container" id={listId} style={styl} >
            {children}
        </div>
        {showIcon && <div className="left-angle-icon-container scroll-button" onClick={() => handleClick("left")}>
            <FaAngleLeft className="left-angle-icon" />
        </div>}
        {showIcon && <div className="right-angle-icon-container scroll-button" onClick={() => handleClick("right")}>
            <FaAngleRight className="right-angle-icon" />
        </div>}
    </div>
}