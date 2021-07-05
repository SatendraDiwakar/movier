import React, { Component } from 'react';

// API
import API from './API'

const MovierContext = React.createContext();

export default class MovierProvider extends Component {

    // state 
    state = {
        tv: {},
        movie: {},
        movies: {},
        loading: true
    }

    // lifecycle hook
    componentDidMount() {
        this.fetchData();
    }

    // fetch data
    fetchData = async () => {
        try {
            const movies = await API.fetchMovies("", 1); // Movies
            const tv = await API.fetchTV("60735"); // tv
            this.setState(prev => {
                return ({
                    movies: {
                        ...movies,
                        results:
                            movies.page > 1 ?
                                [...movies.results, ...prev.movies.results]
                                : [...movies.results],
                    },
                    tv: { ...prev.tv, ...tv }
                })
            }, () => {
                this.setState({
                    loading: false
                })
            })
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return <MovierContext.Provider value={{ ...this.state }}>
            {this.props.children}
        </MovierContext.Provider>
    }
}

export { MovierContext };