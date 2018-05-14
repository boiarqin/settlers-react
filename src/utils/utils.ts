import { ICatanState, IPlayerResources, ITradingResources, Resource, Terrain } from '../types';

// Random # between 1 and 6
export function rollADie(): number {
    // return Math.floor(Math.random() * 6) + 1;
    return random(6, 1);
}

export function random(high: number, low=0) {
    return Math.floor(Math.random() * high) + low;
}

export function getCurrentPlayerColor(state: ICatanState) {
    // reverse if we are on initial moves 2
    if (state.turn >= state.playerColors.length && state.turn < state.playerColors.length*2){
        const reversePlayerNum = state.playerColors.length - (state.turn % state.playerColors.length) - 1;
        return state.playerColors[reversePlayerNum];
    } else {
        const playerNum = state.turn % state.playerColors.length;
        return state.playerColors[playerNum];
    }
}

export function convertTerrainToResource(terrain: Terrain) : Resource | null {
    switch(terrain) {
        case 'forest':
            return 'lumber';
        case 'pasture':
            return 'sheep';
        case 'hill':
            return 'bricks';
        case 'mountain':
            return 'ore';
        case 'field':
            return 'wheat';
        case 'desert':
        default:
            return null;
    }
}

// PREREQUISITE: playerResources cannot go below 0
export function modifyPlayerResources(playerResources: IPlayerResources, changingResources: ITradingResources): IPlayerResources {
    return {
        ...playerResources,
        bricks: playerResources.bricks + (changingResources.bricks ? changingResources.bricks : 0),
        lumber: playerResources.lumber + (changingResources.lumber ? changingResources.lumber : 0),
        ore: playerResources.ore + (changingResources.ore ? changingResources.ore : 0),
        sheep: playerResources.sheep + (changingResources.sheep ? changingResources.sheep : 0),
        wheat: playerResources.wheat + (changingResources.wheat ? changingResources.wheat : 0),
    };
}

// HIDE CERTAIN ASPECTS OF OPPONENT'S STATE
/*
export function getPartialPlayerState(state: ICatanState) {

}*/