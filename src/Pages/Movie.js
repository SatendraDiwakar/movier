import React, { useEffect, useState } from 'react'
// API
import API from '../API'
// config
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../config';
// component
import List from '../Components/List/List';
import CardMain from '../Components/UI/Card Main/CardMain';
import ActorCard from '../Components/UI/ActorCard/ActorCard';
// Image
import noImage from '../Images/noImage.PNG'

export default function Movie({ match }) {

    // state
    const [media, setMedia] = useState({});
    const [loading, setLoading] = useState(true);

    // specific style for main card
    const styl = {
        height: '55rem'
    }

    let id = parseInt(match.params.movie);
    let medType = match.params.mediaType;

    // fetch single media
    const fetchMedia = async (id, mediaType) => {
        let media, credits, directors;
        try {
            media = await API.fetchMedia(id, mediaType)
            credits = await API.fetchCredits(id, mediaType);
            // Get directors only
            directors = credits.crew.filter(
                member => member.job === 'Director'
            );

            setMedia({ ...media, ...credits, directors })
            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchMedia(id, medType);
    }, [id, medType])

    console.log(media);

    if (loading) {
        return null;
    }

    return <>
        <div className="hero">
            <div className="hero-content container container-item" style={{ position: 'absolute', top: '14rem' }}>
                <CardMain styl={styl} showCarousel={true} hero={
                    media.backdrop_path ? IMAGE_BASE_URL + BACKDROP_SIZE + media.backdrop_path : noImage
                } />

                <List listHeading="Cast" listId={medType} >
                    {
                        media.cast.map(item => {
                            return <ActorCard actorName={item.name} actorImg={
                                item.profile_path ? IMAGE_BASE_URL + POSTER_SIZE + item.profile_path : noImage
                            } />
                        })
                    }
                </List>

            </div>
        </div>
    </>
}