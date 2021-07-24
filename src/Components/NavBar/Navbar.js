import React, { useEffect, useRef, useState } from 'react'
// react router
import { Link, useHistory, useLocation } from 'react-router-dom'
// icons
import { RiHomeLine } from 'react-icons/ri'
import { CgSearch } from 'react-icons/cg'
import { FaAngleDown } from 'react-icons/fa'
// components
import Logo from '../Logo'
// image
import logo from '../../Images/logo.PNG'

export default function Navbar() {

    // states
    const [hideNav, setHideNav] = useState(false);
    const [inputValue, setInputValue] = useState("")
    // refs
    const refHeader = useRef(null);
    const refLastScrollTop = useRef();
    const refCheckPath = useRef();
    // react route hook
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (refCheckPath.current !== location.pathname) {
            refLastScrollTop.current = 0;
            setHideNav(false);
            refCheckPath.current = location.pathname
        }

        function checkScrollDirection() {
            var st = window.scrollY;
            if (st > refLastScrollTop.current) {
                setHideNav(true);
            }
            if (refLastScrollTop.current === 0) {
                setHideNav(false);
            }
            refLastScrollTop.current = st <= 0 ? 0 : st;
            // show nav bar when user scroll back to top            
            if (window.scrollY <= 50) {
                setHideNav(false);
            }
        }
        // event listener to show/hide nav bar
        window.addEventListener("scroll", checkScrollDirection, false);

        return () => {
            setHideNav(false); // to get back nav when route path changes
            window.removeEventListener("scroll", checkScrollDirection);
        }
    }, [location.pathname]);

    // Change route if search button click or enter pressed when search bar focused
    function startSearch() {
        setHideNav(false);
        if (inputValue === '') {
            alert("Please type something to search")
        } else {
            history.push(`/s/${inputValue}`);
        }
    }

    return <>
        <header ref={refHeader} style={
            hideNav ? {
                transform: 'translateY(-100%)'
            } : {
                transform: 'translateY(0)'
            }
        }>
            <div className="container">
                <img
                    src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
                    alt="tmdb logo"
                    className="tmdb-logo"
                />
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
        {
            hideNav &&
            <div className="drop-down" onClick={() => setHideNav(false)}>
                <FaAngleDown />
            </div>
        }
    </>
}
