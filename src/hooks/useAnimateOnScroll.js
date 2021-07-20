import { useEffect, useRef, useState } from "react";

export const useAnimateOnScroll = (thumbRef, listId, fromPage) => {

    const [addReveal, setAddReveal] = useState(false);
    const componentMount = useRef(false);

    useEffect(() => {
        // console.log(thumbRef.current);
        return () => {
            componentMount.current = true;
        }
    }, [])

    // logic to hide/reveal thumbs on scroll 
    useEffect(() => {

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

        if (fromPage === 'searchPage') {
            scrollUpDown();
            window.addEventListener('scroll', scrollUpDown);
        }
        else {
            scrollLeftRight();
            document.getElementById(listId).addEventListener('scroll', scrollLeftRight)
        }

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

    }, [thumbRef, listId, fromPage])

    return { addReveal }
}