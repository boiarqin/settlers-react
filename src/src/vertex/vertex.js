import React, { Component } from 'react';
import './vertex.css';

class Vertex extends Component {
    render() {
        return (
            <div className={"vtx vtx-" + this.props.index + " " + this.props.type}>
            </div>
        );
    }
}

export default Vertex;