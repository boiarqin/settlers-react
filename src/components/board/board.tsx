import * as React from 'react';
import { connect } from 'react-redux';

import Edge from '../edge/edge';
import Hexagon from '../hexagon/hexagon';
import Vertex from '../vertex/vertex';

import { ICatanState, IHexagon, IRoad, ITown } from '../../types';
import './board.css'

interface IBoardProps {
    edgeList: IRoad[];
    hexList: IHexagon[];
    vertexList: ITown[];
};

const mapStateToProps = (state: ICatanState, ownProps: IBoardProps) => ({
    edgeList: state.roads,
    hexList: state.allHexagons,
    vertexList: state.towns
});

function Board(props: IBoardProps) {
    const hexTiles = props.hexList.map((hex, i) => {
        return (
            <Hexagon
                key={i}
                index={i}
                terrain={hex.terrain}
                dieRoll={hex.dieRoll}
            />
        );
    });
    const edges = props.edgeList.map((edge, i) => {
        return (
            <Edge
                key={i}
                start={edge[0]}
                end={edge[1]}
            />
        );
    });
    const vertices = props.vertexList.map((vtx, i) => {
        return (
            <Vertex
                key={i}
                index={i}
                type={vtx.isCity ? 'town' : 'city'}
            />
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

export default connect<IBoardProps>(mapStateToProps)(Board);