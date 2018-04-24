export type Vertex = number;

export type Edge = [Vertex, Vertex];

export type Color = 'red' | 'orange' | 'green' | 'blue';

export type Terrain = 'forest' | 'pasture' | 'hill' | 'mountain' | 'field' | 'desert';

export type Resource = 'bricks' | 'wheat' | 'ore' | 'sheep' | 'lumber';

export interface IHexagon {
    terrain: Terrain;
    dieRoll: number;
};

export interface ITown {
    vertex: Vertex;
    color: Color;
    isCity: boolean;
    isPort: boolean;
};

export interface IRoad {
    edge: Edge;
    color: Color;
}

export interface ICard {
    name: string;
    vp: number;
    isKnight: boolean;
    color?: Color;
}

export interface IPlayerResources {
    playerColor: Color;
    bricks: number;
    wheat: number;
    ore: number;
    sheep: number;
    lumber: number;
}

export interface ICatanState {
    allHexagons: IHexagon[];
    // allVertices:
    //totalHexagons: number;
    hexAdjacentVertices: [Vertex, Vertex, Vertex, Vertex, Vertex, Vertex][];
    totalVertices: number;
    allEdges: Edge[];
    
    towns: ITown[];
    roads: IRoad[];
    cards: ICard[];
    
    playerColors: Color[];
    playerResources: {
        [K in Color]?: IPlayerResources
    };
    playerWithLargestArmy: Color | null;
    playerWithLongestRoad: Color | null;
};

export interface IPlayerScore extends IPlayerResources {
    playerName?: string;
    /*playerColor: Color;
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

