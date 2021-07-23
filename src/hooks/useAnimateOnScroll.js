import { useLayoutEffect, useEffect, useRef, useState } from "react";

export const useAnimateOnScroll = (listId, fromPage, loadMoreDone) => {

    // state
    const [addRevealThumb, setAddRevealThumb] = useState(false); // state for conditional animation
    // ref
    const thumbRef = useRef(); // refers thumbnail card

    // component mount
    const componentMount = useRef(false);
    useEffect(() => {
        if (!loadMoreDone)
            setAddRevealThumb(true);
        return () => {
            componentMount.current = true;
        }
    }, [loadMoreDone])

    // logic to hide/reveal thumbs on scroll 
    useLayoutEffect(() => {

        // setting addRevealThumb state when user scrolls up & down
        function scrollUpDown() {

            // checking if thumbs are in the view of screen or not
            if (thumbRef.current.getBoundingClientRect().top < window.innerHeight
            ) {
                if (thumbRef.current.getBoundingClientRect().bottom > 0)
                    setAddRevealThumb(true)
                else
                    setAddRevealThumb(false)
            } else {
                setAddRevealThumb(false)
            }
        }

        // setting addRevealThumb state when user scrolls left & right
        function scrollLeftRight() {

            // checking if thumbs are in the view of screen or not
            if (thumbRef.current.getBoundingClientRect().left < document.getElementById(listId).getBoundingClientRect().right
            ) {
                if (thumbRef.current.getBoundingClientRect().right < document.getElementById(listId).getBoundingClientRect().left)
                    setAddRevealThumb(false)
                else
                    setAddRevealThumb(true)
            } else {
                setAddRevealThumb(false)
            }
        }

        // adding scroll event listener
        if (fromPage === 'searchPage') {
            // if loadmore button is clicked then animation will be removed
            if (!loadMoreDone) {
                window.addEventListener('scroll', scrollUpDown);
            } else {
                window.removeEventListener('scroll', scrollUpDown)
            }
        }
        else {
            scrollLeftRight(); // initial animation for onload
            document.getElementById(listId).addEventListener('scroll', scrollLeftRight)
        }

        // for loading more media animation is removed
        if (loadMoreDone) {
            setAddRevealThumb(false)
        } else {
            setAddRevealThumb(true)
        }

        // clean up
        return () => {
            if (componentMount) {
                if (fromPage === 'searchPage')
                    window.removeEventListener('scroll', scrollUpDown)
                else
                    if (document.getElementsByClassName("hero")[0].hasChildNodes(document.querySelectorAll(".list"))) {
                        Array.from(
                            document.querySelectorAll(".list-container")
                        ).forEach(itm => {
                            itm.removeEventListener('scroll', scrollLeftRight)
                        })
                    }
            }
        }

    }, [listId, fromPage, loadMoreDone])

    return { addRevealThumb, thumbRef }
}