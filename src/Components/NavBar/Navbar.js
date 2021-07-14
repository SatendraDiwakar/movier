import React, { useState, useEffect, useRef } from 'react'
// react router
import { Link, useHistory } from 'react-router-dom'
// icons
import { FiMenu } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import { RiHomeLine } from 'react-icons/ri'
import { CgSearch } from 'react-icons/cg'
// components
import Logo from '../Logo'
import logo from '../../Images/logo.png'

export default function Navbar() {

    const [size, setSize] = useState(window.innerWidth);
    // getting window size to add dynamic style on menu list

    const inputRef = useRef(null);
    const history = useHistory();

    //Logic to close menu if screen size changes in opened menu
    if (size <= 650) {
        if (document.getElementsByClassName('nav')[0].classList.contains('open')) {
            document.getElementsByClassName('nav')[0].classList.remove('open')
        }
        if (document.getElementsByClassName('menu-close')[0].style.display === "block") {
            document.getElementsByClassName('menu-close')[0].style.display = "none"
            document.getElementsByClassName('menu-toggle')[0].style.display = "block"
        }
    }

    useEffect(() => {

        let isMounted = true;

        window.addEventListener('resize', () => {

            if (isMounted === true) {
                setSize(window.innerWidth);
            }
        });

        inputRef.current.addEventListener('keyup', (event) => {
            if (event.keyCode === 13) {
                let value = event.target.value
                history.push(`/s/${value}`);
                event.target.value = '';
            }
        })

        return () => {
            isMounted = false;
        }
    }, []);




    return (
        <header>
            <div className="container">
                <nav className="nav">
                    <Link to="/" className="home-icon">
                        <RiHomeLine />
                    </Link>
                    <Logo logo={logo} />
                    <div className="menu">
                        <FiMenu
                            className="menu-toggle"
                            onClick={() => {
                                document.getElementsByClassName('menu-toggle')[0].style.display = "none"
                                document.getElementsByClassName('menu-close')[0].style.display = "block"
                                document.getElementsByClassName('nav')[0].classList.add('open')
                            }}
                        />
                        <MdClose
                            className="menu-close"
                            onClick={() => {
                                document.getElementsByClassName('menu-toggle')[0].style.display = "block"
                                document.getElementsByClassName('menu-close')[0].style.display = "none"
                                document.getElementsByClassName('nav')[0].classList.remove('open')
                            }}
                        />
                    </div>
                    <div className="search-container">
                        <input
                            ref={inputRef}
                            type="search"
                            className="search-bar"
                            placeholder="search..."
                        />

                        <span className="search-icon"><CgSearch /></span>
                    </div>
                </nav>
            </div>
        </header>
    )
}