import React from 'react';
import HomeCategoryMovies from './HomeCategoryMovies';
import NavBar from './NavBar';

class Home extends React.Component {

    render() {
        const categories = [
            { "id": 28, "name": "Action" },
            // { "id": 12, "name": "Adventure" },
            { "id": 16, "name": "Animation" },
            { "id": 35, "name": "Comedy" },
            { "id": 80, "name": "Crime" },
            // { "id": 99, "name": "Documentary" },
            { "id": 18, "name": "Drama" },
            { "id": 10751, "name": "Family" },
            // { "id": 14, "name": "Fantasy" },
            // { "id": 36, "name": "History" },
            { "id": 27, "name": "Horror" },
            { "id": 10402, "name": "Music" },
            { "id": 9648, "name": "Mystery" },
            { "id": 10749, "name": "Romance" },
            { "id": 878, "name": "Science Fiction" },
            { "id": 10770, "name": "TV Movie" },
            // { "id": 53, "name": "Thriller" },
            { "id": 10752, "name": "War" },
            // { "id": 37, "name": "Western" }
        ];
        return (
            <div>
                <NavBar history={this.props.history} />
                <div className="container">
                    <div className="jumbotron">
                        <h1>TheMovieFinder</h1>
                        <p>Discover Movies, TV Shows and much more...</p>
                        <p><a className="btn btn-primary btn-lg">Learn more</a></p>
                    </div>
                </div>

                <div className="container">
                    {
                        categories.map((category, index) => {
                            return (
                                <HomeCategoryMovies key={index} category={category} />
                            );
                        })
                    }
                </div>
            </div >
        );
    }
}

export default Home;