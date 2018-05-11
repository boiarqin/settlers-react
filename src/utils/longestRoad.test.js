import { getLongestRoadLength, getEndpoints } from './longestRoad';

describe.only('Calculate longest road for player red', ()=> {
    it ('returns 11 for horiz infinity shape, no towns', () => {
        var myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [1,2], color: 'red'},
            {edge: [2,3], color: 'red'},
            {edge: [3,4], color: 'red'},
            {edge: [0,8], color: 'red'},
            {edge: [2,10], color: 'red'},
            {edge: [4,12], color: 'red'},
            {edge: [8,9], color: 'red'},
            {edge: [9,10], color: 'red'},
            {edge: [10,11], color: 'red'},
            {edge: [11,12], color: 'red'}
        ];
        var myTowns = [];
        expect(getLongestRoadLength(myRoads, myTowns)).toEqual(11);
    });
    it('returns 10 for horiz infinity shape, missing one piece', () => {
        var myRoads = [
            {edge: [0,1], color: 'red'},
           // {edge: [1,2], color: 'red'},
            {edge: [2,3], color: 'red'},
            {edge: [3,4], color: 'red'},
            {edge: [0,8], color: 'red'},
            {edge: [2,10], color: 'red'},
            {edge: [4,12], color: 'red'},
            {edge: [8,9], color: 'red'},
            {edge: [9,10], color: 'red'},
            {edge: [10,11], color: 'red'},
            {edge: [11,12], color: 'red'}
        ];
        var myTowns = [
            //{vertex: 1, color: 'green'}
        ];
        expect(getLongestRoadLength(myRoads, myTowns)).toEqual(10);
    });
    it('returns 10 for horiz infinity shape, 1 town', () => {
        var myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [1,2], color: 'red'},
            {edge: [2,3], color: 'red'},
            {edge: [3,4], color: 'red'},
            {edge: [0,8], color: 'red'},
            {edge: [2,10], color: 'red'},
            {edge: [4,12], color: 'red'},
            {edge: [8,9], color: 'red'},
            {edge: [9,10], color: 'red'},
            {edge: [10,11], color: 'red'},
            {edge: [11,12], color: 'red'}
        ];
        var myTowns = [
            {vertex: 1, color: 'green'}
        ];
        expect(getLongestRoadLength(myRoads, myTowns)).toEqual(10);
    });
    
    it ('returns 7 for horiz infinity shape, 2 towns', () => {
        var myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [1,2], color: 'red'},
            {edge: [2,3], color: 'red'},
            {edge: [3,4], color: 'red'},
            {edge: [0,8], color: 'red'},
            {edge: [2,10], color: 'red'},
            {edge: [4,12], color: 'red'},
            {edge: [8,9], color: 'red'},
            {edge: [9,10], color: 'red'},
            {edge: [10,11], color: 'red'},
            {edge: [11,12], color: 'red'}
        ];
        var myTowns = [
            {vertex: 2, color: 'green'},
            {vertex: 12, color: 'blue'}
        ];
        expect(getLongestRoadLength(myRoads, myTowns)).toEqual(7);
    });
});
