import React, { useEffect, useRef, useState } from 'react'
//  react router
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
// styles
import './List.css'

export default function List({ children, listHeading, listId, showIconProp, styl }) {

    const [showIcon,setShowIcon] = useState(showIconProp);

    const refLeftButton = useRef(null); // refering left scroll button
    const refRightButton = useRef(null); // refering right scroll button

    // left scroll button unhide
    useEffect(() => {
        // identifiers
        let mediaContainer = document.getElementById(listId);
        let mediaContainerLeft = mediaContainer.scrollLeft; // scrolled position of elements left
        let mediaContainerWidth = mediaContainer.offsetWidth; // width of element
        let mediaContainerLength = mediaContainer.scrollWidth; // total scroll lenght


        if(mediaContainerLength <= mediaContainerWidth){
            setShowIcon(false);
        }

        if (showIcon) {
            
            if (mediaContainer.scrollLeft === 0) {
                refLeftButton.current.style = "display: none";
            }
            
            // add listener for scroll
            mediaContainer.addEventListener('scroll', () => {
                
                // getting updated scroll position
                mediaContainerLeft = mediaContainer.scrollLeft;
                mediaContainerWidth = mediaContainer.offsetWidth; 
                mediaContainerLength = mediaContainer.scrollWidth;
                
                // logic to hide/show left scroll button
                if (mediaContainer.scrollLeft === 0) {
                    refLeftButton.current.style = "display: none";
                } else {
                    refLeftButton.current.style = "display: block";
                }
                
                // logic to hide/show right scroll button
                if (Math.ceil(mediaContainerLeft + mediaContainerWidth) >= mediaContainerLength) {
                    refRightButton.current.style = "display: none";
                } else {
                    refRightButton.current.style = "display: block";
                }
            })
        }
    }, [listId, showIcon])

    // scroll distance calculation functionality
    let scrollBy = 0; // initial
    function handleClick(direction) {
        // identifiers
        let thumbWidth = document.getElementsByClassName("thumbnail")[0].offsetWidth;
        let mediaContainer = document.getElementById(listId);
        
        scrollBy = mediaContainer.scrollLeft; // updated
        
        if (direction === 'right') {
            if (scrollBy < mediaContainer.scrollWidth) {
                if (mediaContainer.offsetWidth < 250) {
                    scrollBy += thumbWidth;
                } else {
                    scrollBy += (mediaContainer.offsetWidth - (thumbWidth / 2));
                }
            }
        } else if (direction === 'left') {
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
        {showIcon && <div ref={refLeftButton} className="left-angle-icon-container scroll-button" onClick={() => handleClick("left")}>
            <FaAngleLeft className="left-angle-icon" />
        </div>}
        {showIcon && <div ref={refRightButton} className="right-angle-icon-container scroll-button" onClick={() => handleClick("right")}>
            <FaAngleRight className="right-angle-icon" />
        </div>}
    </div>
}