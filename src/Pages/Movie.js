import React, { useContext } from 'react'
// config
import { IMAGE_BASE_URL, BACKDROP_SIZE } from '../config';
// context
import { MovierContext } from '../Context';
// component
import CardMain from '../Components/UI/Card Main/CardMain';
// Image
import noImage from '../Images/noImage.PNG'

export default function Movie({ match }) {

    // context
    const context = useContext(MovierContext);
    const { loading, popularTv, popularMovies } = context;

    // specific style for main card
    const styl = {
        width: '90%',
        height: '55rem',
        position: 'absolute',
        top: '14rem'
    }

    // fetch media
    let media;
    if (!loading) {
        let id = parseInt(match.params.movie);
        if (match.params.mediaType === 'popularMovie') {
            media = popularMovies.results.find((item) => {
                return item.id === id
            })
            console.log(media);
        } else if (match.params.mediaType === 'popularTvShow') {
            media = popularTv.results.find((item) => {
                return item.id === id
            })
            console.log(media);
        }
    }

    return <>
        <div className="hero">
            {!loading && <CardMain styl={styl} hero={
                media.backdrop_path ? IMAGE_BASE_URL + BACKDROP_SIZE + media.backdrop_path : noImage
            } />}
            <div className="container container-item hero-container">
            </div>
        </div>
    </>
}