import { initializeState } from '../reducers/basic.reducers';
import { isValidTownLocation, getValidTownLocations } from '../utils/verification';

describe('Determine if desired road location is valid', () => {
    it('return false if there are no roads', ()=>{
        const state = initializeState();
        const newTown = {
            vertex: 27,
            color: 'green'
        };
        expect(isValidTownLocation(state, newTown)).toEqual(false);
    });

    it('return false if there are no adjacent roads of the same color', ()=>{
        const state = initializeState();
        state.roads = [{
            edge: [27, 28],
            color: 'red'
        }];
        const newTown = {
            vertex: 27,
            color: 'green'
        };
        expect(isValidTownLocation(state, newTown)).toEqual(false);
    });

    it('return false if there are adjacent roads of the same color but adj enemy town', ()=>{
        const state = initializeState();
        state.roads = [{
            edge: [27, 28],
            color: 'red'
        },{
            edge: [16, 27],
            color: 'green'
        }];
        state.towns = [{
            vertex: 28,
            color: 'red'
        }];
        const newTown = {
            vertex: 27,
            color: 'green'
        };
        expect(isValidTownLocation(state, newTown)).toEqual(false);
    });

    it('return false if there are adjacent roads and towns of the same color', ()=>{
        const state = initializeState();
        state.roads = [{
            edge: [27, 28],
            color: 'red'
        },{
            edge: [16, 27],
            color: 'green'
        }];
        state.towns = [{
            vertex: 28,
            color: 'green'
        }];
        const newTown = {
            vertex: 27,
            color: 'green'
        };
        expect(isValidTownLocation(state, newTown)).toEqual(false);
    });

    it('return true if there are adjacent roads and no adj towns', ()=>{
        const state = initializeState();
        state.roads = [{
            edge: [27, 28],
            color: 'red'
        },{
            edge: [28, 29],
            color: 'red'
        },{
            edge: [16, 17],
            color: 'green'
        },{
            edge: [16, 27],
            color: 'green'
        }];
        state.towns = [{
            vertex: 29,
            color: 'red'
        },{
            vertex: 17,
            color: 'green'
        }];
        const newTown = {
            vertex: 27,
            color: 'green'
        };
        expect(isValidTownLocation(state, newTown)).toEqual(true);
    });
});

describe('Get all possible town locations for this color', () => {
    it('return empty array if there are no roads', ()=>{
        const state = initializeState();
        expect(getValidTownLocations(state, 'green')).toEqual([]);
    });

    it('return empty array if there are no roads of the same color', ()=>{
        const state = initializeState();
        state.roads = [{
            edge: [27, 28],
            color: 'red'
        },{
            edge: [48, 49],
            color: 'blue'
        }];
        expect(getValidTownLocations(state, 'green')).toEqual([]);
    });

    it('return empty array for blocked-in road with a town on 1 end', ()=>{
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
        },
        {
            edge: [2, 10],
            color: 'orange'
        }];
        state.towns = [{
            vertex: 2,
            color: 'blue'
        }];
        const validTowns = getValidTownLocations(state, 'orange');
        expect(validTowns).toEqual([]);
    });

    it('return empty array for blocked-in road with a town on 1 end (same color)', ()=>{
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
        },
        {
            edge: [2, 10],
            color: 'orange'
        }];
        state.towns = [{
            vertex: 2,
            color: 'orange'
        }];
        const validTowns = getValidTownLocations(state, 'orange');
        expect(validTowns).toEqual([]);
    });

    it('return array with 2 options for blocked-in road', ()=>{
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
        },
        {
            edge: [2, 10],
            color: 'orange'
        }];
        const validTowns = getValidTownLocations(state, 'orange');
        expect(validTowns.length).toEqual(2);
        expect(validTowns).toEqual(expect.arrayContaining([2, 10]));
    });
})