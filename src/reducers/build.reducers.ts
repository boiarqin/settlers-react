import {ICatanState, IRoad, ITown} from '../types';
import { getCurrentPlayerColor, modifyPlayerResources } from '../utils/utils';

export const buildRoad = (state: ICatanState, action: any) => {
    // TODO: check that this road location is valid
    // TODO: check that player has enough resources
    // TODO: check that player still has road pieces
    // TODO: calculate longest road

    const currentColor = getCurrentPlayerColor(state);
    const currentResources = state.playerResources[currentColor];

    const newRoad: IRoad = {
        color: currentColor,
        edge: action.targetEdge
    };

    const updatedResources = modifyPlayerResources(currentResources, {
        bricks: -1,
        lumber: -1
    });
    
    return {
        ...state,
        playerResources: {
            ...state.playerResources,
            [currentColor] : updatedResources
        },
        roads: [...state.roads, newRoad]
    };
};

export const buildTown = (state: ICatanState, action: any) => {
    // TODO: check that this town location is valid
    // TODO: check that player has enough resources
    // TODO: calculate longest road

    const currentColor = getCurrentPlayerColor(state);
    const currentResources = state.playerResources[currentColor];

    const newTown: ITown = {
        color: currentColor,
        isCity: false,
        isPort: false,
        vertex: action.targetVtx
    };

    const updatedResources = modifyPlayerResources(currentResources, {
        bricks: -1,
        lumber: -1,
        wheat: -1,
        sheep: -1
    });
    
    return {
        ...state,
        playerResources: {
            ...state.playerResources,
            [currentColor] : updatedResources
        },
        towns: [...state.towns, newTown]
    };
};

export const upgradeTown = (state: ICatanState, action: any) => {
    // TODO: check that this town location is valid
    // TODO: check that player has enough resources

    const currentColor = getCurrentPlayerColor(state);
    const currentResources = state.playerResources[currentColor];

    const targetTown = state.towns.find(town => town.color === currentColor && town.vertex === action.targetVtx);
    if (targetTown) {
        targetTown.isCity = true;
    }
    
    const updatedResources = modifyPlayerResources(currentResources, {
        wheat: -2,
        ore: -3
    });
    
    return {
        ...state,
        playerResources: {
            ...state.playerResources,
            [currentColor] : updatedResources
        },
        towns: [...state.towns]
    };
};

export const buildDevCard = (state: ICatanState, action: any) => {
    // TODO: check that player has enough resources

    const currentColor = getCurrentPlayerColor(state);
    const currentResources = state.playerResources[currentColor];

    // get random unselected card
    const randomCard = state.cards[0];
    randomCard.color = currentColor;
    randomCard.wasPlayed = false;
    randomCard.turn = state.turn;
    
    const updatedResources = modifyPlayerResources(currentResources, {
        ore: -1,
        wheat: -1,
        sheep: -1
    });
    
    return {
        ...state,
        playerResources: {
            ...state.playerResources,
            [currentColor] : updatedResources
        },
        cards: [...state.cards]
    };
};