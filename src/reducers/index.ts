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
    STEAL_RESOURCE,
    UPGRADE_TOWN
} from '../actions';
import {ICatanState} from '../types';

const catanReducer = (state: ICatanState, action: any) => {
    switch(action.type) {
        case INITIALIZE_GAME:
        case END_PLAYER_TURN:
        case DISTRIBUTE_RESOURCES:
        case MOVE_THIEF:
        case STEAL_RESOURCE:
        case BUILD_ROAD:
        case BUILD_TOWN:
        case UPGRADE_TOWN:
        case BUILD_DEVELOPMENT_CARD:
        case PLAY_KNIGHT_CARD:
        case OFFER_TRADE:
        case ACCEPT_TRADE:
        case DECLINE_TRADE:
        case BANK_TRADE:
        default:
            return state;
    }
};

export default catanReducer;