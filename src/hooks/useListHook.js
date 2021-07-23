import { useLayoutEffect, useEffect, useState, useRef } from 'react';

export const useListHook = (fromPage, loadMoreDone) => {

    // State that are gonna change based on View position of item
    const [addReveal, setAddReveal] = useState(false);
    const [addRevealText, setAddRevealText] = useState(false);

    // refs
    const listRef = useRef(null); // refering list
    const listContainerRef = useRef(null); // refering list container
    const refLeftButton = useRef(null); // refering left scroll button
    const refRightButton = useRef(null); // refering right scroll button

    const componentMount = useRef(false);
    // component mount
    useEffect(() => {
        if (!loadMoreDone) {
            setAddReveal(true);
            setAddRevealText(true);
        }
        return () => {
            componentMount.current = true;
        }
    }, [loadMoreDone])

    // logic for scroll buttons hide/show
    useLayoutEffect(() => {
        // identifiers
        let mediaContainerLeft = listContainerRef.current.scrollLeft; // scrolled position of elements left
        let mediaContainerWidth = listContainerRef.current.offsetWidth; // width of element
        let mediaContainerLength = listContainerRef.current.scrollWidth; // total scroll lenght

        function hideRevealIcon() {
            // getting updated scroll position
            mediaContainerLeft = listContainerRef.current.scrollLeft;
            mediaContainerWidth = listContainerRef.current.offsetWidth;
            mediaContainerLength = listContainerRef.current.scrollWidth;

            // logic to hide/show left scroll button
            if (listContainerRef.current.scrollLeft === 0) {
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
        }

        
        if (fromPage !== 'searchPage') {
            // checking if list contents dont overflow then hide button
            if (mediaContainerLength <= mediaContainerWidth) {
                refRightButton.current.style = "display: none";
                listContainerRef.current.style = 'justify-content: space-around';
            }
            if (listContainerRef.current.scrollLeft === 0) {
                refLeftButton.current.style = "display: none";
            }

            // add listener for scroll
            listContainerRef.current.addEventListener('scroll', hideRevealIcon)
        }

        // clean up
        let cleanListEventListener = listContainerRef.current;
        return () => {
            if (componentMount) {
                cleanListEventListener.removeEventListener('scroll', hideRevealIcon);
            }
        }
    }, [fromPage])

    // Animate on scroll logic
    useLayoutEffect(() => {

        // hide/reveal list container when its in the view
        function scrollUpDownReveal() {
            if (listRef.current.getBoundingClientRect().top < window.innerHeight) {
                if (fromPage !== 'searchPage') {
                    setTimeout(() => {
                        setAddReveal(true)
                    }, 650);
                } else {
                    setTimeout(() => {
                        setAddReveal(true)
                    }, 650);
                }
            } else {
                setAddReveal(false)
            }
        }
        // reveal text when its in view
        function revealTextFromLeftOnScroll() {
            if (listRef.current.getBoundingClientRect().top < window.innerHeight) {
                if (fromPage !== 'searchPage') {
                    setAddRevealText(true)
                } else {
                    setAddRevealText(true)
                }
            } else {
                setAddRevealText(false)
            }
        }
        // if loadmore button is clicked then animation will be removed
        if (!loadMoreDone) {
            window.addEventListener('scroll', scrollUpDownReveal);
            window.addEventListener('scroll', revealTextFromLeftOnScroll);
        } else {
            window.removeEventListener('scroll', scrollUpDownReveal);
        }

        // clean up
        return () => {
            if (componentMount) {
                window.removeEventListener('scroll', scrollUpDownReveal);
                window.removeEventListener('scroll', revealTextFromLeftOnScroll);
            }
        }
    }, [fromPage, loadMoreDone])

    // scroll distance calculation functionality for scroll button
    let scrollBy = 0; // initial
    function handleClick(direction) {
        // identifiers
        let thumbWidth = document.getElementsByClassName("thumbnail")[0].offsetWidth;

        scrollBy = listContainerRef.current.scrollLeft; // updated

        if (direction === 'right') {
            if (scrollBy < listContainerRef.current.scrollWidth) {
                if (listContainerRef.current.offsetWidth < 250) {
                    scrollBy += thumbWidth;
                } else {
                    scrollBy += (listContainerRef.current.offsetWidth - (thumbWidth / 2));
                }
            }
        } else if (direction === 'left') {
            if (scrollBy !== 0) {
                if (listContainerRef.current.offsetWidth < 250) {
                    scrollBy -= thumbWidth;
                } else {
                    scrollBy -= (listContainerRef.current.offsetWidth - (thumbWidth / 2));
                }
            }
        }
        listContainerRef.current.scroll(scrollBy, 0)
    }

    return {
        addReveal,
        addRevealText,
        listRef,
        listContainerRef,
        refLeftButton,
        refRightButton,
        handleClick
    }
}