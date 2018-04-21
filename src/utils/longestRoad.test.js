import { markRoadSet, divideIntoSets, depthFirstSearch } from './longestRoad';

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

describe ('Calculate length of longest subpath starting from given edge in set', ()=> {
    it ('returns 1 for single piece', () => {
        var myRoads = [
            {edge: [0,1], color: 'red', checked: false}
        ];
        expect(depthFirstSearch(myRoads[0], myRoads)).toEqual(1);
    });
    it ('returns 2 for 2 connected pieces', () => {
        var myRoads = [
            {edge: [0,1], color: 'red', checked: false},
            {edge: [2,1], color: 'red', checked: false}
        ];
        expect(depthFirstSearch(myRoads[0], myRoads)).toEqual(2);
    });
    it ('returns 2 for 2 connected pieces (different order)', () => {
        var myRoads = [
            {edge: [0,1], color: 'red', checked: false},
            {edge: [1,2], color: 'red', checked: false}
        ];
        expect(depthFirstSearch(myRoads[0], myRoads)).toEqual(2);
    });
    it ('returns 3 for 3 connected pieces (start from endpoint)', () => {
        var myRoads = [
            {edge: [0,1], color: 'red', checked: false},
            {edge: [1,2], color: 'red', checked: false},
            {edge: [0,8], color: 'red', checked: false}
        ];
        expect(depthFirstSearch(myRoads[2], myRoads)).toEqual(3);
    });
    it ('returns 2 for 3 connected pieces (start from midpoint)', () => {
        var myRoads = [
            {edge: [0,1], color: 'red', checked: false},
            {edge: [1,2], color: 'red', checked: false},
            {edge: [0,8], color: 'red', checked: false}
        ];
        expect(depthFirstSearch(myRoads[0], myRoads)).toEqual(2);
    });
    it ('returns 3 for 3 connected pieces (in cycle)', () => {
        var myRoads = [
            {edge: [0,1], color: 'red', checked: false},
            {edge: [1,2], color: 'red', checked: false},
            {edge: [0,2], color: 'red', checked: false}
        ];
        expect(depthFirstSearch(myRoads[0], myRoads)).toEqual(3);
    });
    it ('returns 11 for connected pieces (horizontal infinity shape)', () => {
        var myRoads = [
            {edge: [0,1], color: 'red', checked: false},
            {edge: [1,2], color: 'red', checked: false},
            {edge: [2,3], color: 'red', checked: false},
            {edge: [3,4], color: 'red', checked: false},
            {edge: [0,8], color: 'red', checked: false},
            {edge: [2,10], color: 'red', checked: false},
            {edge: [4,12], color: 'red', checked: false},
            {edge: [8,9], color: 'red', checked: false},
            {edge: [9,10], color: 'red', checked: false},
            {edge: [10,11], color: 'red', checked: false},
            {edge: [11,12], color: 'red', checked: false}
        ];
        expect(depthFirstSearch(myRoads[0], myRoads)).toEqual(11);
    });
    it ('returns 11 for connected pieces (horizontal infinity shape, midpoint)', () => {
        var myRoads = [
            {edge: [0,1], color: 'red', checked: false},
            {edge: [1,2], color: 'red', checked: false},
            {edge: [2,3], color: 'red', checked: false},
            {edge: [3,4], color: 'red', checked: false},
            {edge: [0,8], color: 'red', checked: false},
            {edge: [2,10], color: 'red', checked: false},
            {edge: [4,12], color: 'red', checked: false},
            {edge: [8,9], color: 'red', checked: false},
            {edge: [9,10], color: 'red', checked: false},
            {edge: [10,11], color: 'red', checked: false},
            {edge: [11,12], color: 'red', checked: false}
        ];
        expect(depthFirstSearch(myRoads[5], myRoads)).toEqual(11);
    });
});
