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
import {cardList, edgeList, hexAdjacentVertices, hexList, numVertices, playerColors} from '../constants';
import {Color, ICatanState, IPlayerResources} from '../types';

const initialState : ICatanState = (() => {
    const playerResources : {[K in Color]?: IPlayerResources} =
        playerColors.reduce((accm, color) => {
            accm[color] = ({
                bricks: 0,
                lumber: 0,
                ore: 0,
                sheep: 0,
                wheat: 0
            } as IPlayerResources);
            return accm;
        }, {});
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
        towns: []
    };
})();

const catanReducer = (state: ICatanState = initialState, action: any) => {
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