import React, { useEffect, useRef } from 'react'
// react router
import { Link, useHistory } from 'react-router-dom'
// icons
import { RiHomeLine } from 'react-icons/ri'
import { CgSearch } from 'react-icons/cg'
// components
import Logo from '../Logo'
import logo from '../../Images/logo.png'

export default function Navbar() {

    const inputRef = useRef(null);
    const searchButton = useRef(null);
    const history = useHistory();

    useEffect(() => {

        let isMounted = true;

        if(isMounted){

            // event listener for enter key press in search bar
            inputRef.current.addEventListener('keyup', (event) => {
                
                if (event.keyCode === 13) {
                    if (typeof event.target.value === 'undefined' || event.target.value === '') {
                        alert("Please type something to search")
                    } else {
                        let value = event.target.value;
                        history.push(`/s/${value}`);
                        event.target.value = '';
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
                    event.target.value = '';
                }
            })
        }

        return () => {
            isMounted = false;
        }
    }, [history]);




    return (
        <header>
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