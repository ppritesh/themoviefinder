import React from 'react';
import axios from 'axios';
import HomeCategoryMovieItem from './HomeCategoryMovieItem';
import OwlCarousel from 'react-owl-carousel';

class HomeCategoryMovies extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: false
        }
    }

    componentWillMount() {

        let cid = this.props.category.id;
        this.__getData(cid);
    }
    componentWillReceiveProps(nextProps) {
        let cid = this.props.category.id;
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
        if (!this.state.movies) {
            return (
                <div>
                    <div className="loader">Loadeing</div>
                </div>
            )

        }

        return (
            <div>
                <h3> {this.props.category.name} </h3>
                <div className="full-Width">

                    <OwlCarousel
                        slideSpeed={300}
                        items={8}
                        itemsCustom={[[0, 2], [400, 3], [700, 5], [1000, 7], [1200, 8], [1600, 10]]}
                        lazyLoad={true}
                        navigationText={[
                            "<i class='icon-chevron-left icon-white glyphicon glyphicon-chevron-left'></i>",
                            "<i class='icon-chevron-right icon-white glyphicon glyphicon-chevron-right'></i>"
                        ]}
                        navigation={true} >
                        {
                            this.state.movies.map((movie, index) => {
                                return (
                                    <HomeCategoryMovieItem key={index} movie={movie} />
                                );
                            })
                        }

                    </OwlCarousel>
                </div>
            </div>

        );
    }
}

export default HomeCategoryMovies;