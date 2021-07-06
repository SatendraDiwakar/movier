import React, { useContext } from 'react';

// context
import { MovierContext } from '../Context'

// component
import Navbar from '../Components/NavBar/Navbar';
import CardMain from '../Components/UI/Card Main/CardMain';
import PopularMovies from '../Components/PopularMovies/PopularMovies';

// Image
import noImage from '../Images/noImage.PNG'

export default function Home() {

    const context = useContext(MovierContext);
    const { loading, popularTv, popularMovies } = context;

    return <>
        <Navbar />
        <div className="hero">
            <div className="container container-item hero-container">
                <CardMain />
                {!loading && <PopularMovies popularMedia={popularMovies} />}
                {!loading && <PopularMovies popularMedia={popularTv} />}
            </div>
        </div>
    </>
}