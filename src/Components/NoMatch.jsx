import React, { Component } from 'react';
import NavBar from './NavBar';
import { Link } from "react-router-dom";

class NoMatch extends Component {
    render() {
        return (
            <div>
                <NavBar  history={this.props.history} />
                <div className="container">
                    <div className="jumbotron">
                        <h1>Opps ... </h1>
                         <p>Requested page not found</p>
                        <p><Link to="/" className="btn btn-primary btn-lg">Back to Home</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default NoMatch;