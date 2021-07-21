import { useLayoutEffect, useEffect, useRef, useState } from "react";

export const useAnimateOnScroll = (listId, fromPage, loadMoreDone ) => {

    const [addReveal, setAddReveal] = useState(false); // state for conditional animation
    const thumbRef = useRef(); // refers thumbnail card
    
    // component mount
    const componentMount = useRef(false);
    useEffect(() => {
        return () => {
            componentMount.current = true;
        }
    }, [])

    // logic to hide/reveal thumbs on scroll 
    useLayoutEffect(() => {

        // setting addReveal state when user scrolls up & down
        function scrollUpDown() {
            
            // checking if thumbs are in the view of screen or not
            if (thumbRef.current.getBoundingClientRect().top < window.innerHeight
            ) {
                if (thumbRef.current.getBoundingClientRect().bottom > 0)
                setAddReveal(true)
                else
                setAddReveal(false)
            } else {
                setAddReveal(false)
            }
        }
        
        // setting addReveal state when user scrolls left & right
        function scrollLeftRight() {

            // checking if thumbs are in the view of screen or not
            if (thumbRef.current.getBoundingClientRect().left < document.getElementById(listId).getBoundingClientRect().right
            ) {
                if (thumbRef.current.getBoundingClientRect().right < document.getElementById(listId).getBoundingClientRect().left)
                    setAddReveal(false)
                else
                    setAddReveal(true)
            } else {
                setAddReveal(false)
            }
        }

        // adding scroll event listener
        if (fromPage === 'searchPage') {
            scrollUpDown(); // initial animation for onload
            window.addEventListener('scroll', scrollUpDown);
        }
        else {
            scrollLeftRight(); // initial animation for onload
            document.getElementById(listId).addEventListener('scroll', scrollLeftRight)
        }
        
        // for loading more media animation is removed
        if(loadMoreDone){
            setAddReveal(false)
        } else {
            setAddReveal(true)
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

    return { addReveal, thumbRef }
}