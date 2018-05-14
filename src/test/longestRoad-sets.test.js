import { markRoadSet, divideIntoSets } from '../utils/longestRoad';

const numUniqSets = ((roads) => {
    const uniqSets = roads.reduce((accm, curr)=> {
        if (!accm.includes(curr.set)){
            accm = accm.concat(curr.set);
        }
        return accm;
    }, []);

    return uniqSets.length;
});

describe ('Test grouping of unconnected road pieces into sets (no towns):', ()=> {
    it ('returns empty set for 0 roads ands towns', () => {
        const myRoads = [];
        const myTowns = [];
    
        expect(divideIntoSets(myRoads, myTowns)).toEqual([]);
    });

    it ('returns 1 sets for 1 road piece', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'}
        ];
        const myTowns = [];
        
        expect(numUniqSets(divideIntoSets(myRoads, myTowns))).toEqual(1);
    });

    it ('returns 2 sets for 2 unconnected road pieces', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [3,2], color: 'red'}
        ];
        const myTowns = [];
    
        expect(numUniqSets(divideIntoSets(myRoads, myTowns))).toEqual(2);
    });

    it ('returns 5 sets for 5 unconnected road pieces', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [3,2], color: 'red'},
            {edge: [53,45], color: 'red'},
            {edge: [40,41], color: 'red'},
            {edge: [11,21], color: 'red'}
        ];
        const myTowns = [];
    
        expect(numUniqSets(divideIntoSets(myRoads, myTowns))).toEqual(5);
    });
});

describe ('Test grouping of connected road pieces into sets (no towns):', ()=> {
    it ('returns 1 sets for 2 connected road pieces', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [1,2], color: 'red'}
        ];
        const myTowns = [];
        
        expect(numUniqSets(divideIntoSets(myRoads, myTowns))).toEqual(1);
    });

    it ('returns 1 sets for 2 connected road pieces (different vtx order)', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [2,1], color: 'red'}
        ];
        const myTowns = [];
        
        expect(numUniqSets(divideIntoSets(myRoads, myTowns))).toEqual(1);
    });

    it ('returns 1 sets for 3 connected road pieces', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [2,1], color: 'red'},
            {edge: [0,8], color: 'red'}
        ];
        const myTowns = [];
        
        expect(numUniqSets(divideIntoSets(myRoads, myTowns))).toEqual(1);
    });

    it ('returns 2 sets for 5 road pieces', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [2,1], color: 'red'},
            {edge: [0,8], color: 'red'},
            {edge: [34,44], color: 'red'},
            {edge: [33,34], color: 'red'}
        ];
        const myTowns = [];
        
        expect(numUniqSets(divideIntoSets(myRoads, myTowns))).toEqual(2);
    });
});

describe ('Test breaking of connected road pieces by towns:', ()=> {
    it ('returns 1 sets for 2 connected road pieces with intersecting town (same color)', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [1,2], color: 'red'}
        ];
        const myTowns = [
            {vertex: 1, color: 'red'}
        ];
        
        expect(numUniqSets(divideIntoSets(myRoads, myTowns))).toEqual(1);
    });

    it ('returns 2 sets for 2 connected road pieces with intersecting town (diff color)', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [1,2], color: 'red'}
        ];
        const myTowns = [
            {vertex: 1, color: 'green'}
        ];
        
        expect(numUniqSets(divideIntoSets(myRoads, myTowns))).toEqual(2);
    });

    it ('returns 3 sets for 5 road pieces', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [2,1], color: 'red'},
            {edge: [0,8], color: 'red'},
            {edge: [34,44], color: 'red'},
            {edge: [33,34], color: 'red'}
        ];
        const myTowns = [
            {vertex: 1, color: 'green'},
            {vertex: 2, color: 'blue'},
            {vertex: 34, color: 'red'}
        ];
        
        expect(numUniqSets(divideIntoSets(myRoads, myTowns))).toEqual(3);
    });
});