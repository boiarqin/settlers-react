import { Color, ICatanState, ITown, IVertex } from '../types';
import { ICatanBot } from '../types/bot';

export const createBasicBot: (color: Color) => ICatanBot = (color: Color) => {
    const getOwnColor = () => {
        return color;
    };

    const isValidInitTownLocation = (state: ICatanState, newTown: ITown) : boolean => {
        const vertex = newTown.vertex;
    
        // there must not be another town here
        const hasExistingTown = typeof state.towns.find(t => t.vertex === vertex) !== 'undefined';
        // there must not be an adjacent town
        const adjacentVertices = state.allEdges
            .filter(e => e[0] === vertex || e[1] === vertex)
            .map(e => e[0] === vertex ? e[1] : e[0]);
        const hasAdjacentTowns = state.towns.filter(t => adjacentVertices.includes(t.vertex)).length > 0;

        return !hasExistingTown && !hasAdjacentTowns;
    };
    
    // return array of valid town locations for player color
    const getValidInitTownLocations = (state: ICatanState, playerColor: Color) : IVertex[] => {
        const validTownLocations: IVertex[] = [];
        for (let i = 0; i < state.totalVertices; i++) {
            const tempTown = {
                color: playerColor,
                isCity: false,
                isPort: false,
                vertex: i
            };
            if (isValidInitTownLocation(state, tempTown)){
                validTownLocations.push(i);
            }
        }
        return validTownLocations;
    };

    const basicInitialMove = (state: ICatanState) => {
        const validTowns = getValidInitTownLocations(state, getOwnColor());
        const randomTownIdx = Math.floor(Math.random() * validTowns.length);
        const townVertex = validTowns[randomTownIdx];
        const adjacentRoads = state.allEdges
        .filter(e => e[0] === townVertex || e[1] === townVertex)
        .filter(e => typeof state.roads.find(r => r.edge === e) === 'undefined');
        const randomRoadIdx = Math.floor(Math.random() * adjacentRoads.length);
        const roadEdge = adjacentRoads[randomRoadIdx];

        // tslint:disable
        //console.log(adjacentVertices)
        // tslint:enable

        return {
            roadEdge,
            townVertex
        };
    }

    return {
        acceptOrDeclineTrade: (state: ICatanState, trade: any) => {
            return {
                type: 'sdfdsf'
            };
        }, 
        /* getOwnColor: () => {
            return color;
        }, */
        makeInitialMove1: basicInitialMove,
        makeInitialMove2: basicInitialMove,
        makeTurn: (state: ICatanState) => {
            // if there is enough resources, build a road
            // if there is enough resources, build a town
            // if there are no resources, end turn
            return {
                type: 'END_PLAYER_TURN'
            };
        },
        
    }
};