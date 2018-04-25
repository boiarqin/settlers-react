import {cardList, edgeList, hexAdjacentVertices, hexList, numVertices, playerColors} from '../constants';
import {Color, ICard, ICatanState, IPlayerResources, IPlayerScore} from '../types';

// Default to 4 players
export function initializeState() : ICatanState {
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
        hexAdjacentVertices,
        playerColors,
        playerResources,
        playerWithLargestArmy: null,
        playerWithLongestRoad: null,
        roads: [],
        totalVertices: numVertices,
        towns: []
    };
}

// take in board state, return score for each player
export function getPlayerScores(state: ICatanState) : IPlayerScore[]{
    return state.playerColors.map(color => getSinglePlayerScore(state, color))
}

function getSinglePlayerScore(state: ICatanState, color: Color): IPlayerScore{
    const {playerColor, bricks, wheat, ore, sheep, lumber} = state.playerResources[color as string];
    const roads = state.roads.filter(road => road.color === color);
    const towns = state.towns.filter(town => town.color === color);
    const cards = state.cards.filter(card => card.color === color);
    const hasLargestArmy = state.playerWithLargestArmy === color;
    const hasLongestRoad = state.playerWithLongestRoad === color;
    
    return {
        bricks,
        cards,
        hasLargestArmy,
        hasLongestRoad,
        lumber,
        ore,
        playerColor,
        roads,
        sheep,
        towns,
        wheat
    };
}

export function calculateVP(score: IPlayerScore): number {
    return score.towns.reduce((townsSum, town) => {
            if (town.isCity){
                return townsSum + 2;
            } else {
                return townsSum + 1;
            }
        }, 0)
        + (score.hasLargestArmy ? 2 : 0)
        + (score.hasLongestRoad ? 2 : 0)
        + (score.cards.reduce((cardVPSum, card) => {
            return cardVPSum + card.vp;
            }, 0));
}

export function countPlayedKnights(cards: ICard[]): number{
    return cards.reduce((numPlayedKnights, card) => {
        return numPlayedKnights + (card.isKnight && card.wasPlayed ? 1 : 0);
    }, 0); 
}