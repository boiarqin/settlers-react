export type IVertex = number;

export type IEdge = [IVertex, IVertex];

export type Color = 'red' | 'orange' | 'green' | 'blue';

export type Terrain = 'forest' | 'pasture' | 'hill' | 'mountain' | 'field' | 'desert';

export type Resource = 'bricks' | 'wheat' | 'ore' | 'sheep' | 'lumber';

export interface IHexagon {
    terrain: Terrain;
    dieRoll: number;
};

export interface ITown {
    vertex: IVertex;
    color: Color;
    isCity: boolean;
    isPort: boolean;
};

export interface IRoad {
    edge: IEdge;
    color: Color;
}

export interface ICard {
    name: string;
    vp: number;
    isKnight: boolean;
    color?: Color;
    wasPlayed?: boolean;
    turn?: number;
}

export interface IPlayerResources {
    playerColor: Color;
    bricks: number;
    lumber: number;
    ore: number;
    sheep: number;
    wheat: number;
}

export interface ITradingResources {
    bricks?: number;
    lumber?: number;
    ore?: number;
    sheep?: number;
    wheat?: number;
}

export interface ICatanState {
    allHexagons: IHexagon[];
    // allVertices:
    // totalHexagons: number;
    hexAdjacentVertices: Array<[IVertex, IVertex, IVertex, IVertex, IVertex, IVertex]>;
    totalVertices: number;
    allEdges: IEdge[];

    thiefHex: number;

    eventList: IEvent[],
    
    towns: ITown[];
    roads: IRoad[];
    cards: ICard[];
    
    playerColors: Color[];
    playerResources: {
        [K in Color]: IPlayerResources
    };
    playerNames: {
        [K in Color]: string
    };
    playerWithLargestArmy: Color | null;
    playerWithLongestRoad: Color | null;
    turn: number;
    turnSubAction: number;
};

export interface IPlayerScore extends IPlayerResources {
    playerName: string;
    /* playerColor: Color;
    bricks: number;
    wheat: number;
    ore: number;
    sheep: number;
    lumber: number; */
    cards: ICard[];
    roads: IRoad[];
    towns: ITown[];
    hasLargestArmy: boolean;
    hasLongestRoad: boolean;
};

// [verbosity level, player color | null, text, additional text]
// [1, null, "Initialize game", null]
// [1, null, "Game over", null]
// [1, 'green', "built road", "at [0, 1]"]
// [1, 'blue', "moved the thief", "and stole from"]
// [3, null, "Distribute resources from die roll 5", ""]
export type IEvent = [number, Color | null, string, string | null];