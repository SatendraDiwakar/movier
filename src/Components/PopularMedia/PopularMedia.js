import React from 'react'
//  react router
import { Link } from 'react-router-dom'
// config
import { POSTER_SIZE, IMAGE_BASE_URL } from '../../config';
// Component
import List from '../List/List'
import ThumbnailCard from '../UI/ThumbnailCard/ThumbnailCard'
// Image
import noImage from '../../Images/noImage.PNG'

export default function PopularMovies({ popularMedia, popularMediaHeading, mediaType }) {

    return <List listHeading={popularMediaHeading} listId={mediaType} >
        {
            popularMedia.results.map(item => {
                return (
                    <Link key={item.id} to={`/${mediaType}/${item.id}/`}>
                        <ThumbnailCard id={item.id} title={item.title || item.name} thumbnail={
                            item.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + item.poster_path : noImage
                        } />
                    </Link>
                )
            })
        }
    </List>


}