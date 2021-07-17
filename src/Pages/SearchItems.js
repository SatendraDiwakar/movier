import React, { useState, useEffect, useRef, useCallback } from 'react'
// API
import API from '../API'
// components
import SearchedMedia from '../Components/MediaList/MediaList';

export default function SearchItems({ match }) {

    // states
    const [searchMovies, setSearchMovies] = useState({ seRes: [] }); // movie state
    const [searchTv, setSearchTv] = useState({ seRes: [] }); // tv shows state
    const [page, setPage] = useState(1); // page state
    const [mediaType, setMediaType] = useState('Movies'); // media type state for buttons
    const [loading, setLoading] = useState(true); // loading state for spinner

    // Route params identifiers
    let searchTermParam = useRef(match.params.searchTerm);
    let seT = useRef();
    // fetch searched media

    const fetchSearched = useCallback(async (medType, searchTerm, page) => {
        let searchResults;
        try {
            if (searchTermParam.current !== match.params.searchTerm) {
                searchResults = await API.fetchSearch(medType, searchTerm, 1);
                searchTermParam.current = match.params.searchTerm;
            } else {
                searchResults = await API.fetchSearch(medType, searchTerm, page);
                searchTermParam.current = match.params.searchTerm;
            }
            searchResults.results.sort((a, b) => a.popularity - b.popularity).reverse();

            if (medType === 'movie') {
                setSearchMovies((prevItems) => {

                    let res = searchResults.results;
                    let totalPage = searchResults.total_pages;

                    if (seT.current !== searchTerm) {
                        return { seRes: [...res], totalPage }
                    }

                    return { seRes: [...prevItems.seRes, ...res], totalPage }
                })
            } else if (medType === 'tv') {
                setSearchTv((prevItems) => {

                    let res = searchResults.results;
                    let totalPage = searchResults.total_pages;

                    if (seT.current !== searchTerm) {
                        return { seRes: [...res], totalPage }
                    }

                    return { seRes: [...prevItems.seRes, ...res], totalPage }
                })
            }

            seT.current = searchTerm
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }, [match.params.searchTerm])

    function loadMorePages() {

        if (mediaType === 'Movies') {
            if (page <= searchMovies.totalPage) {
                setPage(prev => {
                    return prev + 1
                })
            }
        } else if (mediaType === 'Tv Shows') {
            if (page <= searchTv.totalPage) {
                setPage(prev => {
                    return prev + 1
                })
            }
        }
    }

    useEffect(() => {

        let medType;
        if (mediaType === 'Movies') {
            medType = 'movie'
        } else if (mediaType === 'Tv Shows') {
            medType = 'tv'
        }
        fetchSearched(medType, match.params.searchTerm, page);
    }, [mediaType, match.params.searchTerm, page, fetchSearched])

    if (loading) {
        return null;
    }

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
                                setPage(1)
                                setSearchMovies({ seRes: [] })
                                setMediaType('Movies')
                            }} >Movies</button>
                        <button className="media-type-button"
                            id="tv-type-button"
                            onClick={() => {
                                document.getElementById("tv-type-button").classList.add("media-type-button-active")
                                document.getElementById("movie-type-button").classList.remove("media-type-button-active")
                                setPage(1)
                                setSearchTv({ seRes: [] })
                                setMediaType('Tv Shows')
                            }} >Tv Shows</button>
                    </div>
                    <SearchedMedia
                        mediaList={mediaType === 'Movies' ? searchMovies.seRes : searchTv.seRes}
                        mediaListHeading={searchMovies.seRes.length !== 0 ? `${mediaType} related to '${match.params.searchTerm}'` : `Sorry, No Results are found for '${match.params.searchTerm}'`}
                        mediaType={mediaType === 'Movies' ? 'movie' : 'tv'}
                        fromPage="searchPage"
                    />
                    <div className="media-type-button-container">
                        <button className="media-type-button"
                            id="movie-type-button"
                            onClick={loadMorePages} >Load More</button>
                        <button className="media-type-button"
                            id="movie-type-button"
                            onClick={() => { window.scrollTo(0, 0) }} >Babk to Top</button>
                    </div>
                </>
            }
        </div>
    </div>
}