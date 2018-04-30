import { ICatanState } from '../types';

// Random # between 1 and 6
export function rollADie(): number {
    return Math.floor(Math.random() * 6) + 1;
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

// HIDE CERTAIN ASPECTS OF OPPONENT'S STATE
/*
export function getPartialPlayerState(state: ICatanState) {

}*/