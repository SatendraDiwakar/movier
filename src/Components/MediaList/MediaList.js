import React from 'react'
//  react router
import { Link } from 'react-router-dom'
// unique id package
import uniqid from 'uniqid';
// config
import { POSTER_SIZE, IMAGE_BASE_URL } from '../../config';
// Component
import List from '../List/List'
import ThumbnailCard from '../UI/ThumbnailCard/ThumbnailCard'

export default function MediaList({ mediaList, mediaListHeading, mediaType, fromPage, loadMoreDone }) {

    return <List
        listHeading={mediaListHeading}
        listId={mediaType}
        fromPage={fromPage}
        loadMoreDone={loadMoreDone}
    >
        {
            mediaList.length > 0 && mediaList.map(item => {
                let uid = uniqid();
                return (
                    <Link key={uid} to={`/media/${mediaType}/${item.id}/`}>
                        <ThumbnailCard
                            listId={mediaType}
                            fromPage={fromPage === 'searchPage' ? 'searchPage' : null}
                            title={item.title || item.name}
                            thumbnail={
                                item.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + item.poster_path : "noPosterImage"
                            }
                            loadMoreDone={loadMoreDone}
                        />
                    </Link>
                )
            })
        }
    </List>


}