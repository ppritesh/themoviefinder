import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

// import App from './App';
import Home from "./Components/Home";
import GenreMovies from "./Components/GenreMovies";
import MovieDetail from "./Components/MovieDetail";
import TvShowsDetail from "./Components/TvShowsDetail";
import Actor from "./Components/Actor";
import Search from "./Components/Search";
import NoMatch from "./Components/NoMatch";

import './theme.css';
import './App.css';

ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/genre/:categoryId/:categoryName" component={GenreMovies} />
                <Route path="/movie/:movieId" component={MovieDetail} />
                <Route path="/tv/:movieId" component={TvShowsDetail} />
                <Route path="/actor/:actorId" component={Actor} />
                <Route path="/search" component={Search} />
                <Route component={NoMatch} />
            </Switch>
        </div>
    </Router>,
    document.getElementById('root')
);
