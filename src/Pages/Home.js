import React, { useContext } from 'react';

// context
import { MovierContext } from '../Context'

// component
import Navbar from '../Components/NavBar/Navbar';
import CardMain from '../Components/UI/Card Main/CardMain';
import PopularMedia from '../Components/PopularMedia/PopularMedia';

export default function Home() {

    const context = useContext(MovierContext);
    const { loading, popularTv, popularMovies } = context;

    return <>
        <Navbar />
        <div className="hero">
            <div className="container container-item hero-container">
                <CardMain />
                {!loading && <PopularMedia popularMedia={popularMovies} popularMediaHeading="Popular Movies" mediaType="popularMovie" />}
                {!loading && <PopularMedia popularMedia={popularTv} popularMediaHeading="Popular Tv Shows" mediaType="popularTvShow" />}
            </div>
        </div>
    </>
}