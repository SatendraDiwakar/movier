import React, { useContext } from 'react';

// context
import { MovierContext } from '../Context'

// Image
import heroHome from '../Images/heroHome.jpg'

// component
import CardMain from '../Components/UI/Card Main/CardMain';
import PopularMedia from '../Components/MediaList/MediaList';

export default function Home() {

    // context
    const context = useContext(MovierContext);
    const { loading, popularTv, popularMovies } = context;

    return <>
        <div className="hero">
            <div className="container container-item hero-content">
                <CardMain hero={heroHome} showCarousel={false} />
                {!loading &&
                    <>
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
                    </>
                }
                <div className="media-type-button-container">
                    <button className="media-type-button"
                        id="movie-type-button"
                        onClick={() => { window.scrollTo(0, 0) }} >
                        Babk to Top
                    </button>
                </div>
            </div>
        </div>
    </>
}