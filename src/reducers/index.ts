/* import { combineReducers } from 'redux'; */
import {
    ACCEPT_TRADE,
    BANK_TRADE,
    BUILD_DEVELOPMENT_CARD,
    BUILD_ROAD,
    BUILD_TOWN,
    DECLINE_TRADE,
    DISTRIBUTE_RESOURCES,
    END_PLAYER_TURN,
    INITIALIZE_GAME,
    MOVE_THIEF,
    OFFER_TRADE,
    PLAY_KNIGHT_CARD,
    UPGRADE_TOWN,
} from '../actions';
import {ICatanState} from '../types';

import {
    distributeResources,
    endPlayerTurn,
    initializeState,
    moveThief
} from './basic.reducers';
import {
    buildDevCard,
    buildRoad,
    buildTown,
    upgradeTown
} from './build.reducers';
import { playKnightCard } from './card.reducers';
import { 
    acceptTrade,
    bankTrade,
    declineTrade,
    offerTrade
 } from './trade.reducers';

const initialState = initializeState();

const catanReducer = (state: ICatanState = initialState, action: any) => {
    switch(action.type) {
        case INITIALIZE_GAME:
            return initialState;
        case END_PLAYER_TURN:
            return endPlayerTurn(state, action);
        case DISTRIBUTE_RESOURCES:
            return distributeResources(state, action);
        case MOVE_THIEF:
            return moveThief(state, action);
        case BUILD_ROAD:
            return buildRoad(state, action);
        case BUILD_TOWN:
            return buildTown(state, action);
        case UPGRADE_TOWN:
            return upgradeTown(state, action);
        case BUILD_DEVELOPMENT_CARD:
            return buildDevCard(state, action);
        case PLAY_KNIGHT_CARD:
            return playKnightCard(state, action);
        case OFFER_TRADE:
            return offerTrade(state, action);
        case ACCEPT_TRADE:
            return acceptTrade(state, action);
        case DECLINE_TRADE:
            return declineTrade(state, action);
        case BANK_TRADE:
            return bankTrade(state, action);
        default:
            return state;
    }
};

export default catanReducer;