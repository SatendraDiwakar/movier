import React, { useEffect, useRef, useState } from 'react'
//  react router
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
// styles
import './List.css'

export default function List({ children, listHeading, listId, fromPage }) {

    const [showIcon, setShowIcon] = useState(true);
    const [addReveal, setAddReveal] = useState(false);

    const refLeftButton = useRef(null); // refering left scroll button
    const refRightButton = useRef(null); // refering right scroll button
    const listRef = useRef(null); // refering list

    const revealList = {
        animation: 'reveal 1s ease-in-out  forwards'
    }

    const stylList = {
        flexWrap: 'wrap',
        gap: '4rem 3rem',
        justifyContent: 'space-evenly'
    }

    // logic for scroll buttons hide/show
    useEffect(() => {
        // identifiers
        let mediaContainer = document.getElementById(listId);
        let mediaContainerLeft = mediaContainer.scrollLeft; // scrolled position of elements left
        let mediaContainerWidth = mediaContainer.offsetWidth; // width of element
        let mediaContainerLength = mediaContainer.scrollWidth; // total scroll lenght

        if(fromPage !== 'searchPage'){

            if (mediaContainerLength <= mediaContainerWidth) {
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
    
                    // we can style individual thumb or just mediacontainer
                })
            }
        }

    }, [listId, showIcon, fromPage])


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
    
    // hide/reveal list when its in the screen view
    useEffect(() => {
        function scrollUp() {
            if (listRef.current.getBoundingClientRect().top < window.innerHeight) {
                setAddReveal(true)
            } else {
                setAddReveal(false)
            }
        }

        if (fromPage === 'searchPage') {
            scrollUp();
            window.addEventListener('scroll', scrollUp);
        } else {
            setTimeout(() => {
                scrollUp();
                window.addEventListener('scroll', scrollUp);
            }, 1000);
        }

        return () => {
            window.removeEventListener('scroll', scrollUp)
        }
    }, [fromPage])

    return <div ref={listRef} className="list" style={addReveal ? revealList : null} >
        <h2 className="list-heading">{listHeading}</h2>
        <div className="list-container" id={listId} style={fromPage === 'searchPage' ? stylList : null} >
            {children}
        </div>
        {
            fromPage !== 'searchPage' &&
            <>
                <div ref={refLeftButton} className="left-angle-icon-container scroll-button" onClick={() => handleClick("left")}>
                    <FaAngleLeft className="left-angle-icon" />
                </div>
                <div ref={refRightButton} className="right-angle-icon-container scroll-button" onClick={() => handleClick("right")}>
                    <FaAngleRight className="right-angle-icon" />
                </div>
            </>
        }
    </div>
}