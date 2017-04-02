import React from 'react';
import axios from 'axios';
import MovieListItem from './MovieListItem';
import GenreCategoryList from './GenreCategoryList';
import NavBar from './NavBar';

class GenreMovies extends React.Component {

    constructor() {
        super();
        this.state = ({
            movies: []
        })
    }
    componentWillMount() {
        let cid = this.props.match.params.categoryId;
        this.__getData(cid);
    }

    componentWillReceiveProps(nextProps) {
        let cid = nextProps.match.params.categoryId;
        this.__getData(cid);
    }

    __getData(cid) {
        axios.get("https://api.themoviedb.org/3/genre/" + cid + "/movies?api_key=26b34b7e33b0f9a18df39af1d7118c1e")
            .then(response => {
                this.setState({
                    movies: response.data.results
                })
            })
    }

    render() {
        return (
            <div>
                <NavBar history={this.props.history} />
                <div className="container">
                    <div className="row">

                        <div className="col-lg-3 col-md-3 col-sm-4">
                            <GenreCategoryList />
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8">
                            <div className="panel panel-default">
                                <div className="panel-heading">

                                    <h2 className="movie-detail-title">{this.props.match.params.categoryName}</h2>

                                </div>
                                <div className="panel-body">

                                    <div className="row">
                                        {
                                            this.state.movies.map((movie, index) => {
                                                return (
                                                    <MovieListItem key={index} movie={movie} />
                                                );
                                            })
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GenreMovies;