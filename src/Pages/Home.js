import React, { useContext, useEffect } from 'react';
// context
import { MovierContext } from '../Context'
// Image
import heroHome from '../Images/heroHome.jpg'
// component
import CardMain from '../Components/UI/Card Main/CardMain';
import PopularMedia from '../Components/MediaList/MediaList';
import Loader from '../Components/UI/Loader/Loader';

export default function Home() {

    // context
    const context = useContext(MovierContext);
    const { loading, popularTv, popularMovies } = context;

    useEffect(() => {
        window.scrollTo(0, 0); // whenever a new movie loaded window will goto top    
    }, [])

    // Returning preloader if context data is not there
    if (loading) {
        return <Loader />
    }

    return <div className="hero">
        {!loading &&
            <div className="home container container-item hero-content">
                <CardMain hero={heroHome} styl={{margin:'1rem 0 5rem'}}/>
                <PopularMedia
                    mediaList={popularMovies.results}
                    mediaListHeading="Popular Movies"
                    mediaType="movie"
                />
                <PopularMedia
                    mediaList={popularTv.results}
                    mediaListHeading="Popular Tv Shows"
                    mediaType="tv"
                />
                <div className="media-type-button-container">
                    <button className="media-type-button"
                        id="movie-type-button"
                        onClick={() => { window.scrollTo(0, 0) }} >
                        Babk to Top
                    </button>
                </div>
            </div>
        }
    </div>
}