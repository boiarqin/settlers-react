import {cardList, edgeList, hexAdjacentVertices, hexList, numVertices, playerColors} from '../constants';
import {Color, ICatanState, IPlayerResources} from '../types';

export const initializeState = () => {
    const playerResources : {[K in Color]?: IPlayerResources} =
        playerColors.reduce((accm, color) => {
            accm[color] = ({
                bricks: 0,
                lumber: 0,
                ore: 0,
                sheep: 0,
                wheat: 0
            } as IPlayerResources);
            return accm;
        }, {});
    return {
        allEdges: edgeList,
        allHexagons: hexList,
        cards: cardList,
        eventList: ['Initialized game'],
        hexAdjacentVertices,
        playerColors,
        playerResources,
        playerWithLargestArmy: null,
        playerWithLongestRoad: null,
        roads: [],
        totalVertices: numVertices,
        towns: [],
        turn: 0
    };
};

export const endPlayerTurn = (state: ICatanState, action: any) => {
    return {
        ...state,
        turn: state.turn + 1
    };
};

export const distributeResources = (state: ICatanState, action: any) => {
    return state;
};

export const moveThief = (state: ICatanState, action: any) => {
    return state;
};