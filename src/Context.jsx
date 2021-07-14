import React, { Component } from 'react';

// API
import API from './API'

const MovierContext = React.createContext();

export default class MovierProvider extends Component {

    // state 
    state = {
        popularMovies: {},
        popularTv: {},
        loading: true
    }

    // lifecycle hook
    componentDidMount() {
        this.fetchData();
    }

    // fetch data
    fetchData = async () => {
        try {
            const popularMovies = await API.fetchTrending("movie") // popular movies
            const popularTv = await API.fetchTrending("tv") // popular tv shows
            this.setState(prev => {
                return ({
                    popularMovies: { ...prev.popularMovies, ...popularMovies },
                    popularTv: { ...prev.popularTv, ...popularTv }
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