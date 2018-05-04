import { ICatanState } from '../types';
import { getCurrentPlayerColor } from '../utils/utils';

export const playKnightCard = (state: ICatanState, action: any) => {
    // TODO: calculate largest army
    const currentColor = getCurrentPlayerColor(state);

    // get unused knight card
    const usableKnight = state.cards.find(card => {
        return card.color === currentColor
        && card.isKnight
        && !card.wasPlayed
        && card.turn !== state.turn
    });

    if (usableKnight){
        usableKnight.wasPlayed = true;
    }
    
    return {
        ...state,
        cards: [...state.cards]
    };
};