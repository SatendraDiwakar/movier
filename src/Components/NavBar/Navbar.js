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

    // states
    const [hideNav, setHideNav] = useState(false);
    const [inputValue, setInputValue] = useState("")
    // refs
    const refHeader = useRef(null);
    // react route hook
    const history = useHistory();

    useEffect(() => {

        // event listener to show/hide nav bar
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

        return () => {
            setHideNav(false);
        }
    }, []);

    function startSearch() {
        if (inputValue === '') {
            alert("Please type something to search")
        } else {
            history.push(`/s/${inputValue}`);
        }
    }

    return (
        <header ref={refHeader} style={
            hideNav ? {
                transform: 'translateY(-100%)'
            } : {
                transform: 'translateY(0)'
            }
        }>
            <div className="container">
                <Logo logo={logo} />
                <nav className="nav">
                    <Link to="/" className="home-icon">
                        <RiHomeLine />
                    </Link>
                    <div className="search-container">
                        <input
                            type="search"
                            className="search-bar"
                            placeholder="search..."
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    startSearch();
                                }
                            }}
                            onChange={e => setInputValue(e.target.value)}
                            value={inputValue}
                        />
                        <span className="search-icon-container" onClick={() => startSearch()}>
                            <CgSearch className="search-icon" />
                        </span>
                    </div>
                </nav>
            </div>
        </header>
    )
}