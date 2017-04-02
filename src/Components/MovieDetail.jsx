import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

class MovieDetail extends Component {

    constructor() {
        super();
        this.state = {
            moviedetail: false,
            castdetail: false,
            videodetail: false,
            similarMovies: false
        }
        this._fetchData = this._fetchData.bind(this);
    }

    componentWillMount() {
        let movieid = this.props.match.params.movieId;
        this._fetchData(movieid);
    }

    componentWillReceiveProps(nextProp) {
        window.scrollTo(0,0);
        let movieid = nextProp.match.params.movieId;
        this._fetchData(movieid);
    }

    _fetchData(movieid) {
        axios.get('https://api.themoviedb.org/3/movie/' + movieid + '?api_key=26b34b7e33b0f9a18df39af1d7118c1e')
            .then(response => {
                this.setState({
                    moviedetail: response.data
                })
            })
        axios.get('https://api.themoviedb.org/3/movie/' + movieid + '/casts?api_key=26b34b7e33b0f9a18df39af1d7118c1e')
            .then(response => {
                this.setState({
                    castdetail: response.data
                })
            })
        axios.get('https://api.themoviedb.org/3/movie/' + movieid + '/videos?api_key=26b34b7e33b0f9a18df39af1d7118c1e')
            .then(response => {
                this.setState({
                    videodetail: response.data.results
                })
            })
        axios.get('https://api.themoviedb.org/3/movie/' + movieid + '/similar?api_key=26b34b7e33b0f9a18df39af1d7118c1e')
            .then(response => {
                this.setState({
                    similarMovies: response.data.results
                })
            })
    }

    render() {


        if (!this.state.moviedetail || !this.state.castdetail || !this.state.videodetail || !this.state.similarMovies) {
            return (
                <div>
                    <NavBar history={this.props.history} />
                    <div className="loader">Loadeing</div>
                </div>
            )

        }
        const DEFAULT_IMG = "https://priteshprajapati.me/assets/no-poster.png"
        var release_date = (new Date(this.state.moviedetail.release_date)).getFullYear();
        return (
            <div>
                <NavBar history={this.props.history} />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-7">
                            <div className="thumbnail">
                                <img className="img" src={"https://image.tmdb.org/t/p/w300/" + this.state.moviedetail.poster_path} alt={this.state.moviedetail.title} onError={(e) => { e.target.src = DEFAULT_IMG }} />
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h2 className="movie-detail-title"> {this.state.moviedetail.original_title}
                                        {
                                            (
                                                () => {
                                                    if (release_date)
                                                        return (" (" + release_date + ")")
                                                }
                                            )()
                                        }
                                    </h2>
                                </div>
                                <div className="panel-body">
                                    {
                                        this.state.moviedetail.genres.map((category, index) => {
                                            return (<Link className="label label-primary genre-action-labal" key={index} to={{ pathname: "/genre/" + category.id + "/" + category.name }} > {category.name}</Link>)
                                        })
                                    }
                                    <h3> Overview </h3>
                                    <p> {this.state.moviedetail.overview} </p>

                                    <h3> Cast </h3>
                                    <div className="row">
                                        {
                                            this.state.castdetail.cast.map((cast, index) => {
                                                if (index >= 6) {
                                                    return false;
                                                }
                                                return (
                                                    <div key={index} className="col-xs-6 col-md-2 col-sm-3">
                                                        <Link to={"/actor/" + cast.id}  >
                                                            <div className="thumbnail">
                                                                <img src={"https://image.tmdb.org/t/p/w300/" + cast.profile_path} alt={cast.name} onError={(e) => { e.target.src = DEFAULT_IMG }} />
                                                                <h5 className="tmf-movie-title"> {cast.name} </h5>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="full-width">
                        <div className="panel panel-default">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 style={{ margin: 0 }}> Trailer </h3>
                                </div>
                                <div className="panel-body">
                                    <div className="embed-responsive embed-responsive-16by9">
                                        {
                                            this.state.videodetail.map((video, index) => {
                                                if (index >= 1) {
                                                    return false;
                                                }
                                                return (<iframe key={index} className="embed-responsive-item" style={{ border: "0" }} src={"https://www.youtube.com/embed/" + video.key}></iframe>);
                                            })
                                        }
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="movie-detail-title"> Similar Movies </h3>
                        </div>
                        <div className="panel-body">

                            <div className="row">
                                {
                                    (
                                        () => {
                                            if (this.state.similarMovies.length === 0) {
                                                return (<div className="col-md-12"> <h5>  No Record Founds.</h5> </div>)
                                            } else {
                                                return this.state.similarMovies.map((movie, index) => {
                                                    if (index >= 12) {
                                                        return false;
                                                    }
                                                    var release_date = (new Date(movie.release_date)).getFullYear();
                                                    return (
                                                        <div key={index} className="col-xs-6 col-sm-2">
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
            </div>
        );

    };
}


export default MovieDetail;  