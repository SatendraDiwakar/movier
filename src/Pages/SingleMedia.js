import React, { useEffect, useState } from 'react'
// API
import API from '../API'
// config
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../config';
// component
import SimilarMedia from '../Components/MediaList/MediaList';
import List from '../Components/List/List';
import CardMain from '../Components/UI/Card Main/CardMain';
import MediaDetailsCard from '../Components/UI/MediaDetailsCard/MediaDetailsCard';
import ActorCard from '../Components/UI/ActorCard/ActorCard';
import Loader from '../Components/UI/Loader/Loader';
// Image
import noProfileImage from '../Images/noProfileImage.PNG'

export default function SingleMedia({ match }) {

    window.scrollTo(0, 0); // whenever a new movie loaded window will goto top

    // state
    const [media, setMedia] = useState({});
    const [loading, setLoading] = useState(true);

    // specific style for main card
    const styleHero = {
        height: '45rem',
        width: '95rem',
        margin: '.5rem',
        marginRight: '2.5rem',
        boxShadow: '0 0 6px #6d85ab'
    }

    // Route params identifiers
    let id = parseInt(match.params.movie);
    let medType = match.params.mediaType;

    // fetch single media(movie/tv)
    const fetchMedia = async (id, mediaType) => {
        let media, similarMedia, credits, directors, videos;
        try {
            media = await API.fetchMedia(id, mediaType);
            similarMedia = await API.fetchSimilarMedia(id, mediaType);
            credits = await API.fetchCredits(id, mediaType);
            // Get directors only
            directors = credits.crew.filter(
                member => member.job === 'Director'
            );
            videos = await API.fetchMediaVideo(id, mediaType);

            setMedia({ ...media, ...credits, directors, videos, similarMedia })
            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchMedia(id, medType);
    }, [id, medType])

    if (loading) {
        return <Loader />;
    }

    return <div className="hero">
        {!loading &&
            <div className="hero-content container container-item" style={{ position: 'absolute', top: '14rem' }}>
                <div className="media-name-container">
                    <div className="media-name">
                        <p className="med-name-p animateLeftReveal">{media.original_name || media.original_title}</p>
                    </div>
                </div>
                <div className="media-details">
                    <CardMain styl={styleHero} showCarousel={true} hero={
                        media.backdrop_path ? IMAGE_BASE_URL + BACKDROP_SIZE + media.backdrop_path : "noBackdropImage"
                    } />
                    <MediaDetailsCard
                        overview={media.overview}
                        rating={media.vote_average}
                        video={media.videos.results[0] ? `https://www.youtube.com/watch?v=${media.videos.results[0].key}` : ''}
                    />
                </div>
                {
                    media.cast.length > 0 ?
                        <List listHeading="Cast" listId="mediaCast" showIconProp={true}>
                            {
                                media.cast.map(item => {
                                    return <ActorCard  actorName={item.name} actorImg={
                                        item.profile_path ? IMAGE_BASE_URL + POSTER_SIZE + item.profile_path : noProfileImage
                                    } />
                                })
                            }
                        </List>
                        : null
                }

                <SimilarMedia
                    mediaList={media.similarMedia.results}
                    mediaListHeading={medType === 'tv' ? `Similar ${medType} shows` : `Similar ${medType}s`}
                    mediaType={medType}
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