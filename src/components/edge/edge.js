import React, { Component } from 'react';
import './edge.css';

class Edge extends Component {
    render() {
        return (
            <div className={"edge edge-" + this.props.start + "-" + this.props.end}>
            </div>
        );
    }
}

export default Edge;