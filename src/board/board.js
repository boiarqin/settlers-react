import React, { Component } from 'react';
import Hexagon from '../hexagon/hexagon';
import Edge from '../edge/edge';
import Vertex from '../vertex/vertex';
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
        const edges = this.props.edgeList.map((edge, i) => {
            return (
                <Edge
                    key={i}
                    start={edge[0]}
                    end={edge[1]}
                >
                </Edge>
            );
        });
        const vertices = this.props.vertexList.map((vtx, i) => {
            return (
                <Vertex
                    key={i}
                    index={i}
                    type={vtx.type}
                >
                </Vertex>
            );
        });
        return (
            <div className="board">
                <div className="hex-layer">
                    {hexTiles}
                </div>
                <div className="edge-layer">
                    {edges}
                </div>
                <div className="vertex-layer">
                    {vertices}
                </div>
            </div>
        );
    }
}

export default Board;