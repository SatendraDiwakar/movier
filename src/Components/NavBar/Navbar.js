import React, { useEffect, useRef, useState } from 'react'
// react router
import { Link, useHistory } from 'react-router-dom'
// icons
import { RiHomeLine } from 'react-icons/ri'
import { CgSearch } from 'react-icons/cg'
// components
import Logo from '../Logo'
// image
import logo from '../../Images/logo.png'

export default function Navbar() {

    const [hideNav, setHideNav] = useState(false);
    const refHeader = useRef(null);
    const inputRef = useRef(null);
    const searchButton = useRef(null);
    const history = useHistory();

    useEffect(() => {

        let isMounted = true;

        if (isMounted) {

            // event listener for enter key press in search bar
            inputRef.current.addEventListener('keyup', (event) => {

                if (event.keyCode === 13) {
                    if (typeof event.target.value === 'undefined' || event.target.value === '') {
                        alert("Please type something to search")
                    } else {
                        let value = event.target.value;
                        history.push(`/s/${value}`);
                        // event.target.value = '';
                    }
                }
            });

            // event listener for seacrh button click
            searchButton.current.addEventListener('click', (event) => {

                if (typeof event.target.value === 'undefined' || event.target.value === '') {
                    alert("Please type something to search")
                } else {
                    let value = event.target.value;
                    history.push(`/s/${value}`);
                    // event.target.value = '';
                }
            })

            // event listener for nav bar
            var lastScrollTop = 0;
            window.addEventListener("scroll", function () {
                var st = window.scrollY;
                if (st > lastScrollTop) {                    
                    setHideNav(true);
                } else {
                    setHideNav(false);
                }
                lastScrollTop = st <= 0 ? 0 : st;
            }, false);
        }

        return () => {
            isMounted = false;
        }
    }, [history]);
// const [x,setX] =useState(1);
    return (
        <header ref={refHeader} style={
            hideNav ? {
                transform: 'translateY(-100%)'
            } : {
                transform: 'translateY(0)'
            }
        }>
            <div className="container">
                <nav className="nav">
                    <Link to="/" className="home-icon">
                        <RiHomeLine />
                    </Link>
                    <Logo logo={logo} />
                    <div className="search-container">
                        <input
                            ref={inputRef}
                            type="search"
                            className="search-bar"
                            placeholder="search..."
                        />
                        <span className="search-icon-container" ref={searchButton}>
                            <CgSearch className="search-icon" />
                        </span>
                    </div>
                </nav>
            </div>
        </header>
    )
}