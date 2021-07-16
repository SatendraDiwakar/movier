import React, { useState, useEffect } from 'react'
// API
import API from '../API'
// components
import SearchedMedia from '../Components/MediaList/MediaList';

export default function SearchItems({ match }) {

    // state
    const [searchItems, setSearchItems] = useState({});
    const [page, setPage] = useState(1);
    const [mediaType, setMediaType] = useState('Movies');
    const [loading, setLoading] = useState(true);

    // Rouse params identifiers
    let searchTerm = match.params.searchTerm;

    // fetch searched media
    const fetchSearched = async (mediaType, searchTerm, page) => {
        let searchResults;
        try {
            searchResults = await API.fetchSearch(mediaType, searchTerm, page);

            setSearchItems(() => {
                searchResults.results.sort((a, b) => a.popularity - b.popularity).reverse();
                return { searchResults }
            })
            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    function loadMorePages() {

        if (page <= searchItems.searchResults.total_pages)
            setPage(prev => prev + 1)
    }

    useEffect(() => {
        let medType;
        if (mediaType === 'Movies') {
            medType = 'movie'
        } else if (mediaType === 'Tv Shows') {
            medType = 'tv'
        }
        fetchSearched(medType, searchTerm, page);
    }, [mediaType, searchTerm, page])

    if (loading) {
        return null;
    }
    // console.log(searchItems);
    return <div className="hero">
        <div className="hero-content container container-item">

            {!loading &&
                <>
                    <div className="media-type-button-container">
                        <button className="media-type-button media-type-button-active no-hover"
                            id="movie-type-button"
                            onClick={() => {
                                document.getElementById("movie-type-button").classList.add("media-type-button-active")
                                document.getElementById("tv-type-button").classList.remove("media-type-button-active")
                                setMediaType('Movies')
                            }} >Movies</button>
                        <button className="media-type-button"
                            id="tv-type-button"
                            onClick={() => {
                                document.getElementById("tv-type-button").classList.add("media-type-button-active")
                                document.getElementById("movie-type-button").classList.remove("media-type-button-active")
                                setMediaType('Tv Shows')
                            }} >Tv Shows</button>
                    </div>
                    <SearchedMedia
                        mediaList={searchItems.searchResults}
                        mediaListHeading={searchItems.searchResults.results.length !== 0 ? `${mediaType} related to '${searchTerm}'` : `Sorry, No Results are found for '${searchTerm}'`}
                        mediaType={mediaType === 'Movies' ? 'movie' : 'tv'}
                        fromPage="searchPage"
                    />
                    <div className="media-type-button-container">
                        <button className="media-type-button"
                            id="movie-type-button"
                            onClick={loadMorePages} >Load More</button>
                    </div>
                </>
            }
        </div>
    </div>
}