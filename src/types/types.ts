type Vertex = number;

type Edge = [Vertex, Vertex];

type Color = 'red' | 'orange' | 'green' | 'blue';

type Terrain = 'forest' | 'pasture' | 'hill' | 'mountain' | 'field' | 'desert';

type Resource = 'bricks' | 'wheat' | 'ore' | 'sheep' | 'lumber';

interface IHexagon {
    terrain: Terrain;
    dieRoll: number;
};

interface ITown {
    vertex: Vertex;
    color: Color;
    isCity: boolean;
    isPort: boolean;
};

interface IRoad {
    edge: Edge;
    color: Color;
}

interface ICard {
    vp: number;
    isKnight: boolean;
}

export interface ICatanState {
    allHexagons: IHexagon[];
    // allVertices:
    totalHexagons: number;
    totalVertices: number;
    allEdges: Edge[];
    numPlayers: number;
    playerColors: Color[];
    townsCities: ITown[];
    roads: IRoad[];
    cards?: ICard[];
    players?: Resource[];
};

