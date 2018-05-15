import { initializeState } from '../reducers/basic.reducers';
import { isValidRoadLocation, getValidRoadLocations } from '../utils/verification';

describe('Determine if desired road location is valid', () => {
    it('return false if there are no roads of the same color', ()=>{
        const state = initializeState();
        const newRoad = {
            edge: [0, 8],
            color: 'green'
        };
        expect(isValidRoadLocation(state, newRoad)).toEqual(false);
    });

    it('return false if there are no adjacent roads of the same color', ()=>{
        const state = initializeState();
        state.roads = [{
            edge: [0, 1],
            color: 'red'
        }];
        const newRoad = {
            edge: [0, 8],
            color: 'green'
        };
        expect(isValidRoadLocation(state, newRoad)).toEqual(false);
    });

    it('return false if there are no adjacent roads of the same color (swap vertex order)', ()=>{
        const state = initializeState();
        state.roads = [{
            edge: [1, 0],
            color: 'red'
        }];
        const newRoad = {
            edge: [0, 8],
            color: 'green'
        };
        expect(isValidRoadLocation(state, newRoad)).toEqual(false);
    });

    it('return false if there are no adjacent roads of the same color (multiple roads/colors)', ()=>{
        const state = initializeState();
        state.roads = [{
            edge: [1, 2],
            color: 'red'
        },
        {
            edge: [2, 3],
            color: 'green'
        },
        {
            edge: [9, 10],
            color: 'green'
        },
        {
            edge: [10, 11],
            color: 'blue'
        }];
        const newRoad = {
            edge: [2, 10],
            color: 'orange'
        };
        expect(isValidRoadLocation(state, newRoad)).toEqual(false);
    });

    it('return true if there is at least 1 adjacent road of the same color', ()=>{
        const state = initializeState();
        state.roads = [{
            edge: [1, 0],
            color: 'red'
        },{
            edge: [8, 9],
            color: 'blue'
        }];
        const newRoad = {
            edge: [0, 8],
            color: 'blue'
        };
        expect(isValidRoadLocation(state, newRoad)).toEqual(true);
    });
});

describe('Determine all valid road locations', () => {
    it('return empty array if there are no roads of the same color', ()=>{
        const state = initializeState();
        expect(getValidRoadLocations(state, 'green')).toEqual([]);
    });

    it('return empty array if there are no roads of the same color', ()=>{
        const state = initializeState();
        state.roads = [{
            edge: [0, 1],
            color: 'red'
        }];
        expect(getValidRoadLocations(state, 'green')).toEqual([]);
    });

    it('return empty array if there are no adjacent roads of the same color (multiple roads/colors)', ()=>{
        const state = initializeState();
        state.roads = [{
            edge: [1, 2],
            color: 'red'
        },
        {
            edge: [2, 3],
            color: 'green'
        },
        {
            edge: [2, 10],
            color: 'orange'
        },
        {
            edge: [9, 10],
            color: 'green'
        },
        {
            edge: [10, 11],
            color: 'blue'
        }];
        expect(getValidRoadLocations(state, 'orange')).toEqual([]);
    });

    it('return array of options if there is at least 1 unblocked road of the same color', ()=>{
        const state = initializeState();
        state.roads = [{
            edge: [1, 0],
            color: 'red'
        },{
            edge: [8, 9],
            color: 'blue'
        }];
        const validRoads = getValidRoadLocations(state, 'blue');
        expect(validRoads.length).toEqual(4);
        expect(validRoads).toEqual(expect.arrayContaining([[7, 8],[0, 8],[9, 10],[9, 19]]));
    });
});