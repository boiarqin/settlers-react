import { cityCost, devCardCost, roadCost, townCost } from '../constants';
import { ICatanState, IRoad, ITown } from '../types';
import { getCurrentPlayerColor, modifyPlayerResources } from '../utils/utils';
import { canAfford, isValidCityLocation, isValidRoadLocation, isValidTownLocation } from '../utils/verification';

export const buildRoad = (state: ICatanState, action: any) => {
    const currentColor = getCurrentPlayerColor(state);
    const currentResources = state.playerResources[currentColor];

    const newRoad: IRoad = {
        color: currentColor,
        edge: action.targetEdge
    };

    if (canAfford(currentResources, roadCost) && isValidRoadLocation(state, newRoad)){
        // TODO: check that player still has road pieces
        // TODO: calculate longest road
        const updatedResources = modifyPlayerResources(currentResources, roadCost);
        
        return {
            ...state,
            eventList: [...state.eventList, currentColor + ' built a road'],
            playerResources: {
                ...state.playerResources,
                [currentColor] : updatedResources
            },
            roads: [...state.roads, newRoad]
        };
    } else {
        return state;
    }
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

    if (canAfford(currentResources, townCost) && isValidTownLocation(state, newTown)){

        const updatedResources = modifyPlayerResources(currentResources, townCost);
        
        return {
            ...state,
            eventList: [...state.eventList, currentColor + ' built a town'],
            playerResources: {
                ...state.playerResources,
                [currentColor] : updatedResources
            },
            towns: [...state.towns, newTown]
        };
    } else {
        return state;
    }
};

export const upgradeTown = (state: ICatanState, action: any) => {
    const currentColor = getCurrentPlayerColor(state);
    const currentResources = state.playerResources[currentColor];

    if (canAfford(currentResources, cityCost) && isValidCityLocation(state, currentColor, action.targetVtx)){
        const targetTown = state.towns.find(town => town.color === currentColor && town.vertex === action.targetVtx);
        if (targetTown) {
            targetTown.isCity = true;
        }
        
        const updatedResources = modifyPlayerResources(currentResources, cityCost);
        
        return {
            ...state,
            eventList: [...state.eventList, currentColor + ' upgraded a town to a city'],
            playerResources: {
                ...state.playerResources,
                [currentColor] : updatedResources
            },
            towns: [...state.towns]
        };
    } else {
        return state;
    }
};

export const buildDevCard = (state: ICatanState, action: any) => {
    const currentColor = getCurrentPlayerColor(state);
    const currentResources = state.playerResources[currentColor];

    if (canAfford(currentResources, devCardCost)){
        // get random unselected card
        const randomCard = state.cards[0];
        randomCard.color = currentColor;
        randomCard.wasPlayed = false;
        randomCard.turn = state.turn;
        
        const updatedResources = modifyPlayerResources(currentResources, devCardCost);
        
        return {
            ...state,
            cards: [...state.cards],
            playerResources: {
                ...state.playerResources,
                [currentColor] : updatedResources
            }
        };
    } else {
        return state;
    }
};