import { canAfford } from '../utils/verification';

describe('Determine if player can afford a cost', () => {
    it('returns true if player has exactly enough (some resource types)', () => {
        const playerResources = {
            bricks: 1,
            lumber: 0,
            ore: 2,
            sheep: 0,
            wheat: 0
        };
        const cost = {
            bricks: -1,
            lumber: 0,
            ore: -2,
            sheep: 0,
            wheat: 0
        }
        expect(canAfford(playerResources, cost)).toEqual(true);
    });

    it('returns true if player has exactly enough (all resource types)', () => {
        const playerResources = {
            bricks: 1,
            lumber: 3,
            ore: 2,
            sheep: 4,
            wheat: 5
        };
        const cost = {
            bricks: -1,
            lumber: -3,
            ore: -2,
            sheep: -4,
            wheat: -5
        }
        expect(canAfford(playerResources, cost)).toEqual(true);
    });

    it('returns true if player has ample resources(across some resource types)', () => {
        const playerResources = {
            bricks: 2,
            lumber: 1,
            ore: 2,
            sheep: 3,
            wheat: 6
        };
        const cost = {
            bricks: 0,
            lumber: -1,
            ore: -2,
            sheep: -2,
            wheat: -4
        }
        expect(canAfford(playerResources, cost)).toEqual(true);
    });

    it('returns true if player has ample resources(across all resource types)', () => {
        const playerResources = {
            bricks: 10,
            lumber: 2,
            ore: 5,
            sheep: 4,
            wheat: 6
        };
        const cost = {
            bricks: -5,
            lumber: -1,
            ore: -2,
            sheep: -3,
            wheat: -4
        }
        expect(canAfford(playerResources, cost)).toEqual(true);
    });

    it('returns false if player does not have enough (across all resource types)', () => {
        const playerResources = {
            bricks: 0,
            lumber: 1,
            ore: 1,
            sheep: 3,
            wheat: 4
        };
        const cost = {
            bricks: -1,
            lumber: -3,
            ore: -2,
            sheep: -4,
            wheat: -5
        }
        expect(canAfford(playerResources, cost)).toEqual(false);
    });

    it('returns false if player does not have enough (across some resource types)', () => {
        const playerResources = {
            bricks: 2,
            lumber: 1,
            ore: 2,
            sheep: 3,
            wheat: 6
        };
        const cost = {
            bricks: -1,
            lumber: -3,
            ore: -2,
            sheep: -4,
            wheat: -5
        }
        expect(canAfford(playerResources, cost)).toEqual(false);
    });
});