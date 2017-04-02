import React from 'react';
import { Link } from 'react-router-dom';

class HomeCategoryMovieItem extends React.Component {

    render() {
        let posterImage = "https://priteshprajapati.me/assets/no-poster.png"
        return (
            <div className="thumbnail">
                <Link to={'/movie/' + this.props.movie.id}>
                    <img className="lazyOwl" data-src={"https://image.tmdb.org/t/p/w300/" + this.props.movie.poster_path} alt={this.props.movie.title} onError={(e) => { e.target.src = posterImage }} />
                </Link>
            </div>
        );
    }
}

export default HomeCategoryMovieItem;