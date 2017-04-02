import React from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { Link } from 'react-router-dom';

class Actor extends React.Component {

    constructor() {
        super();

        this.state = {
            actorDetail: false,
            actorMovies: false
        }
    }

    componentWillMount() {
        let actorid = this.props.match.params.actorId;
        axios.get("https://api.themoviedb.org/3/person/" + actorid + "?api_key=26b34b7e33b0f9a18df39af1d7118c1e")
            .then((response) => {
                this.setState({
                    actorDetail: response.data
                })
            });

        axios.get("https://api.themoviedb.org/3/person/" + actorid + "/movie_credits?api_key=26b34b7e33b0f9a18df39af1d7118c1e")
            .then((response) => {
                this.setState({
                    actorMovies: response.data.cast
                })
            });
    }

    render() {
        if (!this.state.actorDetail || !this.state.actorMovies) {
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
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-4">
                            <div className="thumbnail">
                                <img className="img" src={"https://image.tmdb.org/t/p/w300/" + this.state.actorDetail.profile_path} alt={this.state.actorDetail.title} onError={(e) => { e.target.src = DEFAULT_IMG }} />
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h2 className="movie-detail-title"> {this.state.actorDetail.name} </h2>
                                </div>
                                <div className="panel-body">
                                    {(() => {
                                        if (this.state.actorDetail.birthday) {
                                            return (<p> Birthdate : {this.state.actorDetail.birthday} </p>);
                                        }
                                    })()}

                                    {(() => {
                                        if (this.state.actorDetail.place_of_birth) {
                                            return (<p>Birth place : {this.state.actorDetail.place_of_birth}</p>);
                                        }
                                    })()}

                                    {(() => {
                                        if (this.state.actorDetail.biography) {
                                            return (
                                                <div>
                                                    <h3> Biography </h3>
                                                    <p>{this.state.actorDetail.biography}</p>
                                                </div>
                                            );
                                        }
                                    })()}
                                </div>
                            </div>
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="movie-detail-title"> Movies </h3>
                                </div>
                                <div className="panel-body">
                                    <div className="row">
                                        {
                                            this.state.actorMovies.map((movie, index) => {
                                                var release_date = (new Date(movie.release_date)).getFullYear();
                                                return (
                                                    <div key={index} className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                                                        <div className="thumbnail">
                                                            <Link to={'/movie/' + movie.id}>
                                                                <img src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path} alt={movie.title} onError={(e) => { e.target.src = DEFAULT_IMG }} />
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
                                                            </Link>
                                                        </div>
                                                    </div>
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
        )
    }
}

export default Actor;