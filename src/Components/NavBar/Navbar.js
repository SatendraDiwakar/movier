import React, { useState, useEffect } from 'react'
import NavLinks from './NavLinks'
import { FiMenu } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import Logo from '../Logo'
import logo from '../../Images/logo.png'

export default function Navbar() {

    // initializing nav bar link names
    const links = ['/', 'card']

    const [size, setSize] = useState(window.innerWidth);
    // getting window size to add dynamic style on menu list


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

        return () => {
            isMounted = false;
        }
    }, []);




    return (
        <header>
            <div className="container">
                <nav className="nav">

                    {/* home icon */}
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
                    <NavLinks
                        links={links}
                        size={size}
                    />
                </nav>
            </div>
        </header>
    )
}