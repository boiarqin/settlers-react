import { initializeState } from '../reducers/basic.reducers';
import { isValidCityLocation, getValidCityLocations } from '../utils/verification';

describe.only('Determine if this vertex has a valid town for upgrading to a city', () => {
    it('return false if there are no roads or towns', ()=>{
        const state = initializeState();
        const newCityVertex = 28;
        expect(isValidCityLocation(state, 'green', newCityVertex)).toEqual(false);
    });

    it('return false if there are no roads or towns of same color', ()=>{
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
        const newCityVertex = 11;
        expect(isValidCityLocation(state, 'blue', newCityVertex)).toEqual(false);
    });

    it('return false if there is already a city of same color here', ()=>{
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
            vertex: 11,
            color: 'blue',
            isCity: true
        }];
        const newCityVertex = 11;
        expect(isValidCityLocation(state, 'blue', newCityVertex)).toEqual(false);
    });

    it('return true if there is a towns of same color', ()=>{
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
            vertex: 11,
            color: 'blue',
            isCity: false
        }];
        const newCityVertex = 11;
        expect(isValidCityLocation(state, 'blue', newCityVertex)).toEqual(true);
    });
});