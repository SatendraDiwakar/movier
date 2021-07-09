import React, { useContext } from 'react';

// context
import { MovierContext } from '../Context'

// Image
import heroHome from '../Images/heroHome.jpg'

// component
import CardMain from '../Components/UI/Card Main/CardMain';
import PopularMedia from '../Components/PopularMedia/PopularMedia';

export default function Home() {

    // context
    const context = useContext(MovierContext);
    const { loading, popularTv, popularMovies } = context;

    return <>
        <div className="hero">
            <div className="container container-item hero-container">
                <CardMain hero={heroHome} />
                {!loading && <PopularMedia popularMedia={popularMovies} popularMediaHeading="Popular Movies" mediaType="movie" />}
                {!loading && <PopularMedia popularMedia={popularTv} popularMediaHeading="Popular Tv Shows" mediaType="tv" />}
            </div>
        </div>
    </>
}