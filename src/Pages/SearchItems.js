import React, { useState, useEffect } from 'react'
// API
import API from '../API'
// config
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../config';
// components
import SearchedMedia from '../Components/MediaList/MediaList';

export default function SearchItems({ match }) {

    // state
    const [searchItems, setSearchItems] = useState({});
    const [loading, setLoading] = useState(true);

    console.log(searchItems);
    // Rouse params identifiers
    let searchTerm = match.params.searchTerm;

    // fetch searched media
    const fetchSearched = async (searchTerm, page) => {
        let searchResults;
        try {
            searchResults = await API.fetchSearch(searchTerm, page);

            setSearchItems({ searchResults })
            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSearched(searchTerm, 1);
    }, [searchTerm])

    if (loading) {
        return null;
    }

    return <div className="hero">
        <div className="hero-content container container-item">
            {!loading && <SearchedMedia
                mediaList={searchItems.searchResults}
                mediaListHeading={`Search Results for "${searchTerm}"`}
                mediaType="movie"
                fromPage="searchPage"
            />}
        </div>
    </div>
}