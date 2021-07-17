import React from 'react'
//  react router
import { Link } from 'react-router-dom'
// config
import { POSTER_SIZE, IMAGE_BASE_URL } from '../../config';
// Component
import List from '../List/List'
import ThumbnailCard from '../UI/ThumbnailCard/ThumbnailCard'

export default function MediaList({ mediaList, mediaListHeading, mediaType, fromPage}) {

    const styl = {
        flexWrap: 'wrap',
        gap: '4rem 3rem',
        justifyContent: 'space-evenly'
    }

    return <List
        listHeading={mediaListHeading}
        listId={mediaType}
        styl={fromPage === 'searchPage' ? styl : null}
        showIcon={fromPage === 'searchPage' ? false : true}
    >
        {
            mediaList.map(item => {
                return (
                    <Link key={item.id} to={`/${mediaType}/${item.id}/`}>
                        <ThumbnailCard id={item.id} title={item.title || item.name} thumbnail={
                            item.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + item.poster_path : "noPosterImage"
                        } />
                    </Link>
                )
            })
        }
    </List>


}