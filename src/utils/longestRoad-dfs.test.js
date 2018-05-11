import { depthFirstSearch } from './longestRoad';

describe('Calculate length of longest subpath starting from given edge in set (no towns)', ()=> {
    it ('returns 1 for single piece', () => {
        var myRoads = [
            {edge: [0,1], color: 'red', checked: false}
        ];
        var myTowns = [];
        expect(depthFirstSearch(0, null, myRoads, myTowns)).toEqual(1);
    });
    it ('returns 2 for 2 connected pieces', () => {
        var myRoads = [
            {edge: [0,1], color: 'red', checked: false},
            {edge: [2,1], color: 'red', checked: false}
        ];
        var myTowns = [];
        expect(depthFirstSearch(0, null, myRoads, myTowns)).toEqual(2);
    });
    it ('returns 2 for 2 connected pieces (different order)', () => {
        var myRoads = [
            {edge: [0,1], color: 'red', checked: false},
            {edge: [1,2], color: 'red', checked: false}
        ];
        var myTowns = [];
        expect(depthFirstSearch(0, null, myRoads, myTowns)).toEqual(2);
    });
    it ('returns 3 for 3 connected pieces (start from endpoint)', () => {
        var myRoads = [
            {edge: [0,1], color: 'red', checked: false},
            {edge: [1,2], color: 'red', checked: false},
            {edge: [0,8], color: 'red', checked: false}
        ];
        var myTowns = [];
        expect(depthFirstSearch(2, null, myRoads, myTowns)).toEqual(3);
    });
    it ('returns 2 for 3 connected pieces (start from midpoint)', () => {
        var myRoads = [
            {edge: [0,1], color: 'red', checked: false},
            {edge: [1,2], color: 'red', checked: false},
            {edge: [0,8], color: 'red', checked: false}
        ];
        var myTowns = [];
        expect(depthFirstSearch(0, null, myRoads, myTowns)).toEqual(2);
    });
    it ('returns 3 for 3 connected pieces (in cycle)', () => {
        var myRoads = [
            {edge: [0,1], color: 'red', checked: false},
            {edge: [1,2], color: 'red', checked: false},
            {edge: [0,2], color: 'red', checked: false}
        ];
        var myTowns = [];
        expect(depthFirstSearch(0, null, myRoads, myTowns)).toEqual(3);
    });
    it ('returns 10 for connected pieces (horizontal infinity shape, side piece)', () => {
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
        var myTowns = [];
        expect(depthFirstSearch(0, null, myRoads, myTowns)).toEqual(10);
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
        var myTowns = [];
        expect(depthFirstSearch(5, null, myRoads, myTowns)).toEqual(11);
    }); 
    it ('returns 4 for connected pieces (line shape, 2nd place)', () => {
        var myRoads = [
            {edge: [0,1], color: 'red', checked: false},
            {edge: [1,2], color: 'red', checked: false},
            {edge: [2,3], color: 'red', checked: false},
            {edge: [3,4], color: 'red', checked: false},
            {edge: [4,5], color: 'red', checked: false},
            
        ];
        var myTowns = [];
        expect(depthFirstSearch(1, null, myRoads, myTowns)).toEqual(4);
    }); 
    it ('returns 2 for connected pieces (H shape, midpoint)', () => {
        var myRoads = [
            {edge: [0,1], color: 'red', checked: false},
            {edge: [1,2], color: 'red', checked: false},
            {edge: [2,3], color: 'red', checked: false},
            {edge: [5,2], color: 'red', checked: false},
            {edge: [1,6], color: 'red', checked: false}
        ];
        var myTowns = [];
        expect(depthFirstSearch(1, null, myRoads, myTowns)).toEqual(2);
    });
    it ('returns 3 for connected pieces (H shape, endpoint)', () => {
        var myRoads = [
            {edge: [0,1], color: 'red', checked: false},
            {edge: [1,2], color: 'red', checked: false},
            {edge: [2,3], color: 'red', checked: false},
            {edge: [5,2], color: 'red', checked: false},
            {edge: [1,6], color: 'red', checked: false}
        ];
        var myTowns = [];
        expect(depthFirstSearch(4, null, myRoads, myTowns)).toEqual(3);
    });
});