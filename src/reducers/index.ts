/* import { combineReducers } from 'redux'; */
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
import {ICatanState} from '../types';

import {
    discardHalfResources,
    distributeResources,
    endPlayerTurn,
    initializeState,
    initialMove1,
    initialMove2,
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
        case INITIAL_MOVE_1:
            return initialMove1(state, action);
        case INITIAL_MOVE_2:
            return initialMove2(state, action);
        case DISTRIBUTE_RESOURCES:
            /* tslint:disable */
            console.log('distributeResources')
            /* tslint:enable */
            return distributeResources(state, action);
        case MOVE_THIEF:
            return moveThief(state, action);
        case DISCARD_HALF_RESOURCES:
            return discardHalfResources(state, action);
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