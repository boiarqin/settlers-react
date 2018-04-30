import {cardList, edgeList, hexAdjacentVertices, hexList, numVertices, playerColors} from '../constants';
import {Color, ICatanState, IPlayerResources, IRoad, ITown} from '../types';
import { getCurrentPlayerColor } from '../utils/utils';

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

export const initialMove1 = (state: ICatanState, action: any) => {
    // TODO: check that townVertex and roadEdge is available

    const currentColor = getCurrentPlayerColor(state);
    const newTown: ITown = {
        color: currentColor,
        isCity: false,
        isPort: false,
        vertex: action.townVertex
    };
    const newRoad: IRoad = {
        color: currentColor,
        edge: action.roadEdge
    };
    return {
        ...state,
        eventList: [...state.eventList, currentColor + ' makes initial move 1'],
        roads: [...state.roads, newRoad],
        towns: [...state.towns, newTown],
    };
};

export const initialMove2 = (state: ICatanState, action: any) => {
    // TODO: check that townVertex and roadEdge is available
    // TODO: distribute resources to this player
    const currentColor = getCurrentPlayerColor(state);
    const newTown: ITown = {
        color: currentColor,
        isCity: false,
        isPort: false,
        vertex: action.townVertex
    };
    const newRoad: IRoad = {
        color: currentColor,
        edge: action.roadEdge
    };
    return {
        ...state,
        eventList: [...state.eventList, currentColor + ' makes initial move 2'],
        roads: [...state.roads, newRoad],
        towns: [...state.towns, newTown],
    };
};

export const distributeResources = (state: ICatanState, action: any) => {
    // const dieRoll = action.dieRoll;
    // get all hexes 
    return state;
};

export const moveThief = (state: ICatanState, action: any) => {
    return state;
};