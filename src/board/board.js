import React, { Component } from 'react';
import Hexagon from '../hexagon/hexagon';
import './board.css'

class Board extends Component {
    render() {
        const hexTiles = this.props.hexList.map((hex, i) => {
            return (
                <Hexagon
                    key={i}
                    index={i}
                    terrain={hex.terrain}
                    dieRoll={hex.dieRoll}
                >
                </Hexagon>
            );
        });
        return (
            <div className="board">
            {hexTiles}
            TODO: show game board
            </div>
        );
    }
}

export default Board;