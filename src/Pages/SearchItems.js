import React, { useState, useEffect } from 'react'
// API
import API from '../API'
// components
import SearchedMedia from '../Components/MediaList/MediaList';

export default function SearchItems({ match }) {

    // state
    const [searchItems, setSearchItems] = useState({});
    const [loading, setLoading] = useState(true);

    // Rouse params identifiers
    let searchTerm = match.params.searchTerm;

    // fetch searched media
    const fetchSearched = async (searchTerm, page) => {
        let searchResults;
        try {
            searchResults = await API.fetchSearch(searchTerm, page);

            setSearchItems(()=>{
                searchResults.results.sort((a,b)=>a.popularity-b.popularity).reverse();
                return { searchResults }
            })
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
                mediaListHeading={searchItems.searchResults.results.length!==0?`Search Results for '${searchTerm}'`:`Sorry, No Results are found for '${searchTerm}'`}
                mediaType="movie"
                fromPage="searchPage"
            />}
        </div>
    </div>
}