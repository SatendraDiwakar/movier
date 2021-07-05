import React, { useContext, useEffect } from 'react';

// context
import { MovierContext } from '../Context'

// config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';

// component
import Navbar from '../Components/NavBar/Navbar';

// Image
import noImage from '../Images/noImage.PNG'

export default function Home() {

    const context = useContext(MovierContext);
    const { loading, movies } = context;

    loading && console.log(movies);

    return <>
        <Navbar />
        <div className="hero">
            <div className="container container-item">
                <p>
                    Home
                </p>
            </div>
        </div>
    </>
}