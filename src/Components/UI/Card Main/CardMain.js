import React, { useContext } from 'react';

// context
import { MovierContext } from '../../../Context';

// style
import './CardMain.css'

// Image
import heroHome from '../../../Images/heroHome.jpg'

export default function CardMain() {

    // context
    const context = useContext(MovierContext);
    const { loading } = context;

    // Dynamic styling of hero
    const heroHomeStyle = {
        backgroundImage: `url(${heroHome})`,
        backgroundPosition: 'center',
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat'
    }
    // If image is not loaded
    const defaultBackground = {
        backgroundColor: "#252533"
    }

    return <div className="card-main" style={!loading ? heroHomeStyle : defaultBackground }>

    </div>
}