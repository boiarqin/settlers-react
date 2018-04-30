import {cardList, edgeList, hexAdjacentVertices, hexList, numVertices, playerColors} from '../constants';
import {Color, ICatanState, IPlayerResources, IRoad, ITown} from '../types';
import { convertTerrainToResource, getCurrentPlayerColor } from '../utils/utils';

export const initializeState = () => {
    const playerResources =
        playerColors.reduce((accm, color) => {
            accm[color] = ({
                bricks: 0,
                lumber: 0,
                ore: 0,
                sheep: 0,
                wheat: 0
            } as IPlayerResources);
            return accm;
        }, {} as {[K in Color]: IPlayerResources}); // hacky
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
    const currentColor = getCurrentPlayerColor(state);
    const currentResources = state.playerResources[currentColor];
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
    // get surrounding hexagons
    const adjHexagons = state.hexAdjacentVertices.reduce((accm, adjVtces, index) => {
        if (adjVtces.indexOf(action.townVertex) > -1){
            return [...accm, index];
        } else {
            return accm;
        }
    }, []);

    adjHexagons.forEach(hexIdx => {
        const res = convertTerrainToResource(state.allHexagons[hexIdx].terrain)
        if (res) {
            currentResources[res] = currentResources[res] + 1;
        }
    });

    return {
        ...state,
        eventList: [...state.eventList, currentColor + ' makes initial move 2'],
        playerResources: {
            ...state.playerResources,
            [currentColor] : currentResources
        },
        roads: [...state.roads, newRoad],
        towns: [...state.towns, newTown],
    };
};

export const distributeResources = (state: ICatanState, action: any) => {
    const dieRoll = action.dieRoll;
    const currentResources = state.playerResources;
    
    // get all hexes with matching dieRoll
    const matchingHexagons = state.allHexagons.reduce((accm, hex, index) => {
        if (hex.dieRoll === dieRoll){
            return [...accm, index];
        } else {
            return accm;
        }
    }, []);

    // for each hexagon, distribute resources to adjacent cities
    matchingHexagons.forEach(hexIdx => {
        const adjVtces = state.hexAdjacentVertices[hexIdx];
        const res = convertTerrainToResource(state.allHexagons[hexIdx].terrain);
        // for each vertex, get the town
        if (res){
            state.towns
            .filter(town => adjVtces.indexOf(town.vertex) > -1)
            .forEach(town => {
                currentResources[town.color][res] = currentResources[town.color][res] + (town.isCity ? 2 : 1)
            });
        }
    });

    return {
        ...state,
        eventList: [...state.eventList, 'Distribute resources from die roll ' + dieRoll],
        playerResources: currentResources
    };
};

export const moveThief = (state: ICatanState, action: any) => {
    return state;
};