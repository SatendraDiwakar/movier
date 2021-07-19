import React, { useState, useEffect, useRef, useCallback } from 'react'
// API
import API from '../API'
// components
import SearchedMedia from '../Components/MediaList/MediaList';
import Loader from '../Components/UI/Loader/Loader';

export default function SearchItems({ match }) {

    // states
    const [searchMovies, setSearchMovies] = useState({ seRes: [] }); // movie state
    const [searchTv, setSearchTv] = useState({ seRes: [] }); // tv shows state
    const [page, setPage] = useState(1); // page state
    const [mediaType, setMediaType] = useState('Movies'); // media type state for buttons
    const [loading, setLoading] = useState(true); // state for preloader
    const [loaderForLoadmore, setloaderForLoadmore] = useState(false); // state for loadmore-spinner
    const [zeroElements, setZeroElements] = useState(false); // used for 0 elements fetched
    const [noMoreElement,setNoMoreElement] = useState(); // used to add no results found message in JSX
    
    // Route params identifiers
    let searchTermParam = useRef(match.params.searchTerm);
    let seT = useRef();

    // styles for active button
    const activeButton = {
        pointerEvents: 'none',
        background: 'transparent',
        color: 'white',
        boxShadow: '0 0 5px #6d85ab'
    }

    // used for fetching searched media and also used when we fetch more pages
    const fetchSearched = useCallback(async (medType, searchTerm, page) => {
        let searchResults;
        try {
            setZeroElements(false);
            // checking if user searched for new media 
            // if it is false then fetch next page
            if (searchTermParam.current !== match.params.searchTerm) {
                searchResults = await API.fetchSearch(medType, searchTerm, 1);
                searchTermParam.current = match.params.searchTerm;
            } else {
                searchResults = await API.fetchSearch(medType, searchTerm, page);
                searchTermParam.current = match.params.searchTerm;
            }

            // Checking if any data is fetched or not related to search term
            if (searchResults.results.length > 0) {
                setZeroElements(true);
            }

            // sorting search results based on popularity in decending order
            searchResults.results.sort((a, b) => a.popularity - b.popularity).reverse();

            // setting state based on media type
            if (medType === 'movie') {
                setSearchMovies((prevItems) => {

                    let res = searchResults.results;
                    let totalPage = searchResults.total_pages;

                    // checking if user searched for new media 
                    if (seT.current !== searchTerm) {
                        return { seRes: [...res], totalPage }
                    }
                    // if it is false then updating state with next page
                    return { seRes: [...prevItems.seRes, ...res], totalPage }
                })
            } else if (medType === 'tv') {
                setSearchTv((prevItems) => {

                    let res = searchResults.results;
                    let totalPage = searchResults.total_pages;

                    // checking if user searched for new media 
                    if (seT.current !== searchTerm) {
                        return { seRes: [...res], totalPage }
                    }
                    // if it is false then updating state with next page
                    return { seRes: [...prevItems.seRes, ...res], totalPage }
                })
            }
            seT.current = searchTerm // updating search term if its changed

            // to remove spinner after fetch
            setLoading(false)
            setloaderForLoadmore(false)
        } catch (error) {
            console.log(error);
        }
    }, [match.params.searchTerm])

    // Used to fetch more pages
    function loadMorePages() {
        let element;
        if (mediaType === 'Movies') {
            if (page < searchMovies.totalPage) {
                element = null;
                setNoMoreElement(element)
                setPage(prev => {
                    return prev + 1
                })
            } else {
                // if limit reached then set element st
                setloaderForLoadmore(false);
                setZeroElements(false)
                element = <h2 className="no-result-found">No more results found</h2>;
                setNoMoreElement(element)
            }
        } else if (mediaType === 'Tv Shows') {
            if (page < searchTv.totalPage) {
                element = null;
                setNoMoreElement(element)
                setPage(prev => {
                    return prev + 1
                })
            } else {
                setloaderForLoadmore(false);
                setZeroElements(false)
                element = <h2 className="no-result-found">No more results found</h2>;
                setNoMoreElement(element)
            }
        }
    }

    // functions used for changing media type
    function moviesButtonClick() {
        setPage(1)
        setSearchMovies({ seRes: [] })
        setMediaType('Movies')
    }
    function tvShowsButtonClick() {
        setPage(1)
        setSearchTv({ seRes: [] })
        setMediaType('Tv Shows')
    }

    // run preloader when media type changes or when new search made
    useEffect(() => {
        setLoading(true)
        setNoMoreElement(null)
    }, [mediaType, match.params.searchTerm])

    // calling fetchSearched method to get data
    useEffect(() => {
        let medType;
        if (mediaType === 'Movies') {
            medType = 'movie'
        } else if (mediaType === 'Tv Shows') {
            medType = 'tv'
        }
        fetchSearched(medType, match.params.searchTerm, page);
    }, [mediaType, match.params.searchTerm, page, fetchSearched])

    // Returning preloader during data fetch
    if (loading) {
        return <Loader />;
    }

    return <div className="hero">
        <div className="hero-content container container-item">
            <div className="media-type-button-container">
                <button
                    style={mediaType === 'Movies' ? activeButton : null}
                    className="media-type-button"
                    id="movie-type-button"
                    onClick={moviesButtonClick}>Movies</button>
                <button
                    style={mediaType === 'Tv Shows' ? activeButton : null}
                    className="media-type-button"
                    id="tv-type-button"
                    onClick={tvShowsButtonClick}>Tv Shows</button>
            </div>

            <SearchedMedia
                mediaList={mediaType === 'Movies' ? searchMovies.seRes : searchTv.seRes}
                mediaListHeading={
                    mediaType === 'Movies' ?
                        searchMovies.seRes.length > 0 ?
                            `${mediaType} related to '${match.params.searchTerm}'`
                            : `Sorry, no ${mediaType} found for '${match.params.searchTerm}'`
                        : searchTv.seRes.length > 0 ?
                            `${mediaType} related to '${match.params.searchTerm}'`
                            : `Sorry, no ${mediaType} found for '${match.params.searchTerm}'`
                }
                mediaType={mediaType === 'Movies' ? 'movie' : 'tv'}
                fromPage="searchPage"
            />

            {/* spinner used for loading more data */}
            {
                loaderForLoadmore &&
                <div className="loader">
                    <div className="circle rotate">
                    </div>
                </div>
            }

            {/* If page limit exeeds the show no more message */}
            {noMoreElement}
            
            {/* hide buttons if 0 elements found */}
            {
                zeroElements &&
                <>
                    <div className="media-type-button-container" style={{ marginBottom: '10rem' }}>
                        <button className="media-type-button"
                            id="movie-type-button"
                            onClick={() => {
                                setloaderForLoadmore(true);
                                loadMorePages();
                            }} >Load More</button>
                        <button className="media-type-button"
                            id="movie-type-button"
                            onClick={() => { window.scrollTo(0, 0) }} >Back to Top</button>
                    </div>
                </>
            }
        </div>
    </div>
}