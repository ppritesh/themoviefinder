import React from 'react';
import { Link } from 'react-router-dom';

class MovieListItem extends React.Component {

    render() {
        const DEFAULT_IMG = "https://priteshprajapati.me/assets/no-poster.png"
        return (
            <div className="col-md-3 col-sm-4 col-xs-6">
                <Link className='tmf-movie-title' to={'/movie/' + this.props.movie.id}>
                    <div className="thumbnail">
                        <img className="img" src={"https://image.tmdb.org/t/p/w300/" + this.props.movie.poster_path} alt={this.props.movie.title} onError={(e) => { e.target.src = DEFAULT_IMG }} />
                        <h5 className="tmf-movie-title">{this.props.movie.title}</h5>
                    </div>
                </Link>
            </div>
        );
    }
}

export default MovieListItem;