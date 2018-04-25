import {cardList, edgeList, hexAdjacentVertices, hexList, numVertices, playerColors} from '../constants';
import {Color, ICatanState, IPlayerResources, IPlayerScore} from '../types/types';

// Default to 4 players
export function initializeState() : ICatanState {
    const playerResources : {[K in Color]?: IPlayerResources} =
        playerColors.reduce((accm, color) => {
            accm[color] = ({
                bricks: 0,
                wheat: 0,
                ore: 0,
                sheep: 0,
                lumber: 0
            } as IPlayerResources);
            return accm;
        }, {});
    return {
        allHexagons: hexList,
        hexAdjacentVertices,
        totalVertices: numVertices,
        allEdges: edgeList,
        towns: [],
        roads: [],
        cards: cardList,
        playerColors,
        playerResources: playerResources,
        playerWithLargestArmy: null,
        playerWithLongestRoad: null
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
        playerColor,
        bricks,
        wheat,
        ore,
        sheep,
        lumber,
        roads,
        towns,
        cards,
        hasLargestArmy,
        hasLongestRoad
    };
}