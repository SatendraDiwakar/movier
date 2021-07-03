import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavLinks({ links, size }) {


    // Dynamic style bases on window size
    let st = {
        borderBottom: "#ffb950 2px solid"
    }

    // Used to style active links for bigger screens
    if (size < 650) {
        st = {
            border: "none",
            color: "#ffb950"
        }
    }


    return <div className="nav-links list">
        {links.map((item, index) => {
            if (item === '/') {
                return <NavLink to={`${item}`} key={index} activeStyle={st} exact className="link">Home</NavLink>
            }
            return <NavLink to={`/${item}/`} key={index} activeStyle={st} className="link">{item}</NavLink>
        })}
    </div>
}