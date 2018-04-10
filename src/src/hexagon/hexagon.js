import React, { Component } from 'react';
import './hexagon.css';

class Hexagon extends Component {
    render() {
        const frequentRoll = (this.props.dieRoll === 6 || this.props.dieRoll === 8);
        return (
            <div className={"hex hex-" + this.props.index + " " + this.props.terrain}>
                <div className="hexagon">
                    <div className="hexTop"></div>
                    <div className="hexBottom"></div>
                </div>
                <span className={"die-roll " + (frequentRoll ? "frequent" : "") }>
                    {this.props.dieRoll}
                </span>
            </div>
        );
    }
}

export default Hexagon;