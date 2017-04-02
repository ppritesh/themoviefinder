import React from 'react';
import axios from 'axios';
import MovieListItem from './MovieListItem';
import GenreCategoryList from './GenreCategoryList';
import NavBar from './NavBar';

class Movies extends React.Component {

    constructor() {
        super();
        this.state = ({
            movies: []
        })
    }
    componentWillMount() {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=26b34b7e33b0f9a18df39af1d7118c1e&sort_by=popularity.desc`)
            .then(response => {
                this.setState({
                    movies: response.data.results
                })
            })
    }


    render() {
        return (
            <div>
                <NavBar  history={this.props.history} />
                <div className="col-lg-3 col-md-3 col-sm-4">
                    <GenreCategoryList />
                </div>
                <div className="col-lg-9 col-md-9 col-sm-8">
                    {
                        this.state.movies.map((movie, index) => {
                           
                            return (
                                <MovieListItem key={index} movie={movie} />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Movies;