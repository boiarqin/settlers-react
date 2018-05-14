import { Color, ICatanState, IEdge, IPlayerResources, IRoad, ITown, ITradingResources, IVertex } from '../types';

// return true if player has enough resources
export const canAfford = (playerResources: IPlayerResources, changingResources: ITradingResources): boolean => {
    // no resource amount can go below 0
    const updatedResources = {
        ...playerResources,
        bricks: playerResources.bricks + (changingResources.bricks ? changingResources.bricks : 0),
        lumber: playerResources.lumber + (changingResources.lumber ? changingResources.lumber : 0),
        ore: playerResources.ore + (changingResources.ore ? changingResources.ore : 0),
        sheep: playerResources.sheep + (changingResources.sheep ? changingResources.sheep : 0),
        wheat: playerResources.wheat + (changingResources.wheat ? changingResources.wheat : 0),
    };

    return (
        updatedResources.bricks >= 0
        && updatedResources.lumber >= 0
        && updatedResources.ore >= 0
        && updatedResources.sheep >= 0
        && updatedResources.wheat >= 0
    );
};

// return true if this is valid location for a new road
export const isValidRoadLocation = (state: ICatanState, newRoad: IRoad) : boolean => {
    const start = newRoad.edge[0];
    const end = newRoad.edge[1];
    const color = newRoad.color;
    // there must not be another road here
    const hasExistingRoad = typeof state.roads.find(r => ((r.edge[0] === start && r.edge[1] === end) || (r.edge[1] === start && r.edge[0] === end))) !== 'undefined';
    // this must connect to at least 1 road of the same color
    const hasAdjacentColorRoad = typeof state.roads.find(r => r.color === color && (r.edge[0] === start || r.edge[1] === start || r.edge[0] === end || r.edge[1] === end)) !== 'undefined';
    
    return (!hasExistingRoad && hasAdjacentColorRoad);
};

// return array of valid road locations for player color
export const getValidRoadLocations = (state: ICatanState, color: Color) : IEdge[] => {
    const validRoadLocations: IEdge[] = [];
    return state.allEdges.reduce((accm, currEdge) => {
        const tempRoad = {
            color,
            edge: currEdge
        };
        if (isValidRoadLocation(state, tempRoad)){
            accm.push(currEdge);
        }
        return accm;
    }, validRoadLocations);
}

// return true if this is a valid location for a new town
export const isValidTownLocation = (state: ICatanState, newTown: ITown) : boolean => {
    const vertex = newTown.vertex;
    const color = newTown.color;

    // there must not be another town here
    const hasExistingTown = typeof state.towns.find(t => t.vertex === vertex) !== 'undefined';
    // there must not be an adjacent town
    const adjacentVertices = state.allEdges
        .filter(e => e[0] === vertex || e[1] === vertex)
        .map(e => e[0] === vertex ? e[1] : e[0]);
    const hasAdjacentTowns = state.towns.filter(t => adjacentVertices.includes(t.vertex)).length > 0;
    // this must connect to at least road of the same color
    const hasAdjacentColorRoad = typeof state.roads.find(r => r.color === color && (r.edge[0] === vertex || r.edge[1] === vertex)) !== 'undefined';

    return !hasExistingTown && !hasAdjacentTowns && hasAdjacentColorRoad;
};

// return array of valid town locations for player color
export const getValidTownLocations = (state: ICatanState, color: Color) : IVertex[] => {
    const validTownLocations: IVertex[] = [];
    for (let i = 0; i < state.totalVertices; i++) {
        const tempTown = {
            color,
            isCity: false,
            isPort: false,
            vertex: i
        };
        if (isValidTownLocation(state, tempTown)){
            validTownLocations.push(i);
        }
    }
    return validTownLocations;
};

// return true if this is a valid town for upgrading to city
export const isValidCityLocation = (state: ICatanState, playerColor: Color, cityVertex: number) : boolean => {
    // there must be a town here of the same color
    const hasExistingTown = typeof state.towns.find(t => t.vertex === cityVertex && t.color === playerColor) !== 'undefined';
    return hasExistingTown;
};