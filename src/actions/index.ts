import {Color, IEdge, ITradingResources, IVertex} from '../types';
import {
IBuildRoadAction,
IBuildTownAction,
IDefaultAction,
IDiscardResourcesAction,
IDistributeResourcesAction,
IInitialMoveAction,
IOfferTradeAction,
IPlayKnightAction,
IThiefAction
} from '../types/actions';

/* ACTION TYPES */
export const INITIALIZE_GAME = 'INITIALIZE_GAME';
export const SET_PLAYER_NAMES = 'SET_PLAYER_NAMES';
export const END_PLAYER_TURN = 'END_PLAYER_TURN';
export const DISTRIBUTE_RESOURCES = 'DISTRIBUTE_RESOURCES';
export const INITIAL_MOVE_1 = 'INITIAL_MOVE_1';
export const INITIAL_MOVE_2 = 'INITIAL_MOVE_2';
// THIEF ACTIONS
export const MOVE_THIEF = 'MOVE_THIEF';
export const DISCARD_HALF_RESOURCES = 'DISCARD_HALF_RESOURCES';
// BUILDING
export const BUILD_ROAD = 'BUILD_ROAD';
export const BUILD_TOWN = 'BUILD_TOWN';
export const UPGRADE_TOWN = 'UPGRADE_TOWN'; // same as BUILD_CITY
export const BUILD_DEVELOPMENT_CARD = 'BUILD_DEVELOPMENT_CARD';
// USE DEV CARD
export const PLAY_KNIGHT_CARD = 'PLAY_KNIGHT_CARD';
// TRADE ACTIONS
export const OFFER_TRADE = 'OFFER_TRADE';
export const ACCEPT_TRADE = 'ACCEPT_TRADE';
export const DECLINE_TRADE = 'DECLINE_TRADE';
export const BANK_TRADE = 'BANK_TRADE'; // needs to account for PORT_TRADE

/* ACTION CREATORS */
export const initializeGame = (): IDefaultAction => ({
    type: INITIALIZE_GAME
});

export const setPlayerNames = (playerNames: any) => ({
    playerNames,
    type: SET_PLAYER_NAMES
});

export const endPlayerTurn = (): IDefaultAction => ({
    type: END_PLAYER_TURN
});

export const distributeResources = (dieRoll: number): IDistributeResourcesAction => {
    return {
        dieRoll,
        type: DISTRIBUTE_RESOURCES
    }
};

export const discardHalfResources = (discardedResources: ITradingResources): IDiscardResourcesAction => {
    return {
        discardedResources,
        type: DISCARD_HALF_RESOURCES
    }
};

export const initialMove1 = (townVertex: number, roadEdge: IEdge): IInitialMoveAction => {
    return {
        roadEdge,
        townVertex,
        type: INITIAL_MOVE_1
    }
};

export const initialMove2 = (townVertex: number, roadEdge: IEdge): IInitialMoveAction => {
    return {
        roadEdge,
        townVertex,
        type: INITIAL_MOVE_2
    }
};

export const moveThief = (newHex: number, targetPlayer: Color): IThiefAction => {
    return {
        newHex,
        targetPlayer,
        type: MOVE_THIEF
    }
};

export const buildRoad = (targetEdge: IEdge): IBuildRoadAction => {
    return {
        targetEdge,
        type: BUILD_ROAD
    };
};

export const buildTown = (targetVtx: IVertex): IBuildTownAction => {
    return {
        targetVtx,
        type: BUILD_TOWN
    };
};

export const upgradeTown = (targetVtx: IVertex): IBuildTownAction => {
    return {
        targetVtx,
        type: UPGRADE_TOWN
    };
};

export const buildDevCard = (): IDefaultAction => ({
    type: BUILD_DEVELOPMENT_CARD
});

export const playKnightCard = (targetPlayer: Color): IPlayKnightAction => {
    return {
        targetPlayer,
        type: PLAY_KNIGHT_CARD
    }
};

export const offerTrade = (targetPlayer: Color, myResources: ITradingResources, targetResources: ITradingResources): IOfferTradeAction => {
    return {
        myResources,
        targetPlayer,
        targetResources,
        type: OFFER_TRADE
    };
};

export const acceptTrade = (): IDefaultAction => ({
    type: ACCEPT_TRADE
});

export const declineTrade = (): IDefaultAction => ({
    type: DECLINE_TRADE
});

export const bankTrade = (myResources: ITradingResources, targetResources: ITradingResources): IOfferTradeAction => {
    return {
        myResources,
        targetResources,
        type: BANK_TRADE
    };
};