
function calculateVP(score) {
    return score.towns.length
        + 2*score.cities.length
        + (score.hasLargestArmy ? 2 : 0)
        + (score.hasLongestRoad ? 2 : 0)
        + (score.cards.reduce((cardVPSum, card) => {
            return cardVPSum + card.VP;
            }, 0));
}

function countPlayedKnights(cards){
    return cards.reduce((numPlayedKnights, card) => {
        return numPlayedKnights + (card.isKnight && card.wasPlayed ? 1 : 0);
    }, 0); 
}

export {
    calculateVP,
    countPlayedKnights
};