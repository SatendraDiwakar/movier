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
// Image
import noImage from '../Images/noImage.PNG'

export default function SingleMedia({ match }) {

    window.scrollTo(0,0);

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

    console.log(media);
    // Rouse params identifiers
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
        fetchMedia(id, medType);
    }, [id, medType])

    if (loading) {
        return null;
    }

    return <>
        <div className="hero">
            <div className="hero-content container container-item" style={{ position: 'absolute', top: '14rem' }}>
                <div className="media-name-container"><p className="media-name">{media.original_name || media.original_title}</p></div>
                <div className="media-details">
                    <CardMain styl={styleHero} showCarousel={true} hero={
                        media.backdrop_path ? IMAGE_BASE_URL + BACKDROP_SIZE + media.backdrop_path : noImage
                    } />
                    <MediaDetailsCard
                        overview={media.overview}
                        rating={media.vote_average}
                        video={`https://www.youtube.com/watch?v=${media.videos.results[0].key}`}
                    />
                </div>
                <List listHeading="Cast" listId="mediaCast">
                    {
                        media.cast.map(item => {
                            return <ActorCard actorName={item.name} actorImg={
                                item.profile_path ? IMAGE_BASE_URL + POSTER_SIZE + item.profile_path : noImage
                            } />
                        })
                    }
                </List>
                {!loading && <SimilarMedia
                    mediaList={media.similarMedia}
                    mediaListHeading={medType ==='tv'? `Similar ${medType} shows` : `Similar ${medType}s`}
                    mediaType={medType}
                />}
            </div>
        </div>
    </>
}