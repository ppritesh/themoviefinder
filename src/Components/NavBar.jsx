import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';


class NavBar extends React.Component {

    constructor() {
        super();
        this.submitHandler = this.submitHandler.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.state = {
            inputValue: ''
        };
    }


    componentWillMount() {
        if (!this.props.history) {
            return;
        }
        const qs = queryString.parse(this.props.history.location.search);

        if (!qs.q) {
            return;
        }
        this.setState({
            inputValue: qs.q
        });
    }
    componentDidMount() {
        if (!this.props.history) {
            return;
        }
        const qs = queryString.parse(this.props.history.location.search);

        if (!qs.q) {
            return;
        }
        document.getElementById("searchinput").focus();
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        }, () => {
            this.props.history.push("/search?q=" + this.state.inputValue);
        });
    }

    submitHandler(e) {
        e.preventDefault();
        this.props.history.push("/search?q=" + this.state.inputValue);
    }

    render() {
        return (
            <div>
                <div className="navbar navbar-inverse">
                    <div className="container">
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand">TheMovieFinder</Link>
                            {/*<button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>*/}
                        </div>

                        <form className="navbar-form navbar-right" onSubmit={this.submitHandler}>
                            <div className="form-group ">
                                <input type="text" id="searchinput" className="form-control home-search" value={this.state.inputValue} onChange={this.updateInputValue} placeholder="Search movies, tv shows, person..." />
                            </div>
                            <button type="submit" className="btn btn-default hidden"><span className="glyphicon glyphicon-search"></span></button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;

