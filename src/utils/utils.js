
export function getCurrentPlayerColor(state) {
    const playerNum = Math.mod(state.turn, state.playerColors.length);
    return state.playerColors[playerNum];
}

// HIDE CERTAIN ASPECTS OF OPPONENT'S STATE
export function getPartialPlayerState(state) {

}