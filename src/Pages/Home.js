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
                    <PopularMedia
                        mediaList={popularMovies}
                        mediaListHeading="Popular Movies"
                        mediaType="movie"
                    />
                }
                {!loading &&
                    <PopularMedia
                        mediaList={popularTv}
                        mediaListHeading="Popular Tv Shows"
                        mediaType="tv"
                    />
                }
            </div>
        </div>
    </>
}