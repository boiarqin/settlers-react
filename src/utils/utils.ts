import {
    ACCEPT_TRADE,
    BANK_TRADE,
    BUILD_DEVELOPMENT_CARD,
    BUILD_ROAD,
    BUILD_TOWN,
    DECLINE_TRADE,
    DISCARD_HALF_RESOURCES,
    DISTRIBUTE_RESOURCES,
    END_PLAYER_TURN,
    INITIAL_MOVE_1,
    INITIAL_MOVE_2,
    INITIALIZE_GAME,
    MOVE_THIEF,
    OFFER_TRADE,
    PLAY_KNIGHT_CARD,
    UPGRADE_TOWN,
} from '../actions';
import {
    Color,
    ICatanState,
    IEvent,
    IPlayerResources,
    ITradingResources,
    Resource,
    Terrain
} from '../types';

// Random # between 1 and 6
export function rollADie(): number {
    // return Math.floor(Math.random() * 6) + 1;
    return random(6, 1);
}

export function random(high: number, low=0) {
    return Math.floor(Math.random() * high) + low;
}

export function newEvent(actionType: string, color: Color | null, string1: string, string2=''): IEvent {
    const verbosityMap = {
        [ACCEPT_TRADE]: 1,
        [BANK_TRADE]: 2,
        [BUILD_DEVELOPMENT_CARD]: 1,
        [BUILD_ROAD]: 1,
        [BUILD_TOWN]: 1,
        [DECLINE_TRADE]: 1,
        [DISCARD_HALF_RESOURCES]: 2,
        [DISTRIBUTE_RESOURCES]: 3,
        [END_PLAYER_TURN]: 3,
        [INITIAL_MOVE_1]: 1,
        [INITIAL_MOVE_2]: 1,
        [INITIALIZE_GAME]: 1,
        [MOVE_THIEF]: 1,
        [OFFER_TRADE]: 1,
        [PLAY_KNIGHT_CARD]: 1,
        [UPGRADE_TOWN]: 1,
    };
    return [verbosityMap[actionType], color, string1, string2];
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