import React from 'react'
//  react router
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
// custom hook
import { useListHook } from '../../hooks/useListHook';
// styles
import './List.css'

export default function List({ children, listHeading, listId, fromPage, loadMoreDone }) {

    const {
        addRevealText,
        addReveal,
        listRef,
        listContainerRef,
        refLeftButton,
        refRightButton,
        handleClick
    } = useListHook(fromPage, loadMoreDone); // custom hook

    // Animation Applied based on custom hook value { addReveal, addRevealText}
    // Animation Fade
    const reveal = {
        animation: 'reveal .8s ease-in-out forwards'
    }
    // Animation revealing text from left to right
    const revealText = {
        animation: 'textRevealFromLeft 1.5s linear forwards'
    }

    // Style specific for Searched Media page
    const stylList = {
        flexWrap: 'wrap',
        gap: '4rem 3rem',
        justifyContent: 'space-evenly',
        overflowX: 'hidden'
    }

    return <div ref={listRef} className="list">
        <h2 className="list-heading" style={addRevealText ? revealText : null}>{listHeading}</h2>
        <div
            className="list-container"
            id={listId}
            ref={listContainerRef}
            style={addReveal ?
                fromPage === 'searchPage' ? {
                    ...stylList, ...reveal
                }
                    : { ...reveal }
                : null}
        >
            {children}
        </div>
        {
            fromPage !== 'searchPage' &&
            <>
                <div
                    ref={refLeftButton}
                    className="left-angle-icon-container scroll-button"
                    onClick={() => handleClick("left")}
                >
                    <FaAngleLeft className="left-angle-icon" />
                </div>
                <div
                    ref={refRightButton}
                    className="right-angle-icon-container scroll-button"
                    onClick={() => handleClick("right")}
                >
                    <FaAngleRight className="right-angle-icon" />
                </div>
            </>
        }
    </div>
}