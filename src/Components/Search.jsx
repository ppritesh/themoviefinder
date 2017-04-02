import React from "react";
import axios from "axios";
import NavBar from "./NavBar";
import queryString from "query-string";
import { Link } from 'react-router-dom';

class Search extends React.Component {
    constructor() {
        super();
        this._fetchResults = this._fetchResults.bind(this);
        this.state = {
            results: false,
            searchQuery: '',
            resultActors: false,
            resultTvShows: false
        }
    }

    componentWillMount() {
        this._fetchResults();
    }
    componentDidUpdate() {
        this._fetchResults();
    }

    _fetchResults() {
        const qs = queryString.parse(this.props.location.search);

        if (!qs.q) {
            return;
        }

        if (this.state.searchQuery === qs.q) {
            return;
        }

        this.setState({
            searchQuery: qs.q
        });

        axios.get("https://api.themoviedb.org/3/search/movie?api_key=26b34b7e33b0f9a18df39af1d7118c1e&query=" + qs.q + "&sort_by=popularity.desc")
            .then(response => {
                this.setState({
                    results: response.data.results
                })
            })

        axios.get("https://api.themoviedb.org/3/search/person?api_key=26b34b7e33b0f9a18df39af1d7118c1e&query=" + qs.q + "&sort_by=popularity.desc")
            .then(response => {
                this.setState({
                    resultActors: response.data.results
                })
            })

        axios.get("https://api.themoviedb.org/3/search/tv?api_key=26b34b7e33b0f9a18df39af1d7118c1e&query=" + qs.q + "&sort_by=popularity.desc")
            .then(response => {
                this.setState({
                    resultTvShows: response.data.results
                })
            })
    }

    render() {
        if (!this.state.results || !this.state.resultActors || !this.state.resultTvShows) {
            return (
                <div>
                    <NavBar history={this.props.history} />
                    <div className="loader">Loadeing</div>
                </div>
            )
        }
        const DEFAULT_IMG = "https://priteshprajapati.me/assets/no-poster.png"

        return (
            <div>
                <NavBar history={this.props.history} />
                <div className="container">
                    <div className="page-header">
                        <h1> Showing results for "{this.state.searchQuery}"</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="movie-detail-title"> Movies </h3>
                                </div>
                                <div className="panel-body">

                                    <div className="row">
                                        {
                                            (
                                                () => {
                                                    if (this.state.results.length === 0) {
                                                        return (<div className="col-md-12"> <h5>  No Record Founds.</h5> </div>)
                                                    } else {
                                                        return this.state.results.map((movie, index) => {
                                                            if (index >= 8) {
                                                                return false;
                                                            }
                                                            var release_date = (new Date(movie.release_date)).getFullYear();
                                                            return (
                                                                <div key={index} className="col-xs-6 col-sm-3">
                                                                    <Link className='tmf-movie-title' to={'/movie/' + movie.id}>
                                                                        <div className="thumbnail">
                                                                            <img className="img" src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path} alt={movie.title} onError={(e) => { e.target.src = DEFAULT_IMG }} />

                                                                            <h5 className="tmf-movie-title">{movie.title}
                                                                                {
                                                                                    (
                                                                                        () => {
                                                                                            if (release_date)
                                                                                                return (" (" + release_date + ")")
                                                                                        }
                                                                                    )()
                                                                                }
                                                                            </h5>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            );
                                                        })
                                                    }

                                                }
                                            )()
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="movie-detail-title"> Person </h3>
                                </div>
                                <div className="panel-body">
                                    <div className="row">
                                        {
                                            (
                                                () => {
                                                    if (this.state.resultActors.length === 0) {
                                                        return (<div className="col-md-12"> <h5>  No Record Founds.</h5> </div>)
                                                    }
                                                    return this.state.resultActors.map((movie, index) => {
                                                        if (index >= 6) {
                                                            return false;
                                                        }
                                                        return (
                                                            <div key={index} className="col-xs-6 col-sm-4">
                                                                <Link className='' to={'/actor/' + movie.id}>
                                                                    <div className="thumbnail" style={{ marginBottom: "0px" }}>
                                                                        <img className="img" src={"https://image.tmdb.org/t/p/w300/" + movie.profile_path} alt={movie.name} onError={(e) => { e.target.src = DEFAULT_IMG }} />

                                                                        <h6 className="tmf-movie-title">{movie.name}</h6>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        );
                                                    })

                                                }
                                            )()
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="movie-detail-title"> TV Shows </h3>
                                </div>
                                <div className="panel-body">

                                    <div className="row">
                                        {
                                            (
                                                () => {
                                                    if (this.state.resultTvShows.length === 0) {
                                                        return (<div className="col-md-12"> <h5>  No Record Founds.</h5> </div>)
                                                    } else {
                                                        return this.state.resultTvShows.map((movie, index) => {
                                                            if (index >= 6) {
                                                                return false;
                                                            }
                                                            var release_date = (new Date(movie.release_date)).getFullYear();
                                                            return (
                                                                <div key={index} className="col-xs-6 col-sm-3">
                                                                    <Link className='tmf-movie-title' to={'/tv/' + movie.id}>
                                                                        <div className="thumbnail">
                                                                            <img className="img" src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path} alt={movie.name} onError={(e) => { e.target.src = DEFAULT_IMG }} />

                                                                            <h5 className="tmf-movie-title">{movie.name}
                                                                                {
                                                                                    (
                                                                                        () => {
                                                                                            if (release_date)
                                                                                                return (" (" + release_date + ")")
                                                                                        }
                                                                                    )()
                                                                                }
                                                                            </h5>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            );
                                                        })
                                                    }

                                                }
                                            )()
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

export default Search