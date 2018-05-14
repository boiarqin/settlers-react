import * as React from 'react';
import { connect } from 'react-redux';

import Edge from '../edge/edge';
import Hexagon from '../hexagon/hexagon';
import Vertex from '../vertex/vertex';

import { ICatanState, IHexagon, IRoad, ITown } from '../../types';
import './board.css'

interface IBoardProps {
    hexList: IHexagon[];
    roadList: IRoad[];
    townList: ITown[];
};

const mapStateToProps = (state: ICatanState, ownProps: IBoardProps) => ({
    hexList: state.allHexagons,
    roadList: state.roads,
    townList: state.towns
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
    const edges = props.roadList.map((road, i) => {
        return (
            <Edge
                key={i}
                start={road.edge[0]}
                end={road.edge[1]}
                color={road.color}
            />
        );
    });
    const vertices = props.townList.map((town, i) => {
        return (
            <Vertex
                key={town.vertex}
                index={town.vertex}
                type={town.isCity ? 'city' : 'town'}
                color={town.color}
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