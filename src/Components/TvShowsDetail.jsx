import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

class TvShowsDetail extends Component {

    constructor() {
        super();
        this.state = {
            moviedetail: false,
            castdetail: false,
            videodetail: false
        }
    }

    componentWillMount() {
        let movieid = this.props.match.params.movieId;
        axios.get('https://api.themoviedb.org/3/tv/' + movieid + '?api_key=26b34b7e33b0f9a18df39af1d7118c1e')
            .then(response => {
                this.setState({
                    moviedetail: response.data
                })
            })
            
        axios.get('https://api.themoviedb.org/3/tv/' + movieid + '/videos?api_key=26b34b7e33b0f9a18df39af1d7118c1e')
            .then(response => {
                this.setState({
                    videodetail: response.data.results
                })
            })
    }

    render() {


        if (!this.state.moviedetail ||  !this.state.videodetail) {
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
                        <div className="col-lg-3 col-md-3 col-sm-4">
                            <div className="thumbnail">
                                <img className="img" src={"https://image.tmdb.org/t/p/w300/" + this.state.moviedetail.poster_path} alt={this.state.moviedetail.title} onError={(e) => { e.target.src = DEFAULT_IMG }} />
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h2 className="movie-detail-title"> {this.state.moviedetail.name}
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
                </div>
            </div>
        );

    };
}


export default TvShowsDetail;  