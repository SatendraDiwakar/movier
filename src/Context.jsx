import React ,{ Component } from 'react';

// API
import API from './API'

const MovierContext = React.createContext();

export default class MovierProvider extends Component{

    // state 
    state = {
        tv : {},
        movie: {},
        movies: {},
        loading: false
    }

    // lifecycle hook
    componentDidMount(){
        this.fetchMovies(1);
    }

    // Movies
    fetchMovies = async (searchTerm = "", page) => {
        try {
            const movies = await API.fetchMovies(searchTerm, page);
            // console.log(movies);
            this.setState(prev=>{
                return({
                    movies:{
                        ...movies,
                        results:
                            page > 1 ? 
                            [...movies.results,...prev.results]
                                : [...movies.results]
                    }
                })
            }, ()=>{
                this.setState({
                    loading: true
                })
            })
        } catch (error) {
            console.log(error);
        }
    }

    render(){
        return <MovierContext.Provider value={{...this.state}}>
            {this.props.children}
        </MovierContext.Provider>
    }
}

export {MovierContext};