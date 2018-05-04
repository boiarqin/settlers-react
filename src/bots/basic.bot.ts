import { Color, ICatanState } from '../types';
import { ICatanBot } from '../types/bot';

export const createBasicBot: (color: Color) => ICatanBot = (color: Color) => {
    return {
        acceptOrDeclineTrade: (state: ICatanState, trade: any) => {
            return {
                type: 'sdfdsf'
            };
        },
        getOwnColor: () => {
            return color;
        },
        makeInitialMove1: (state: ICatanState) => {
            return {
                roadEdge: state.allEdges[state.towns.length],
                townVertex: state.towns.length,
            };
        },
        makeInitialMove2: (state: ICatanState) => {
            return {
                roadEdge: state.allEdges[state.towns.length],
                townVertex: state.towns.length,
            };
        },
        makeTurn: (state: ICatanState) => {
            return {
                type: 'END_PLAYER_TURN'
            };
        },
        
    }
};