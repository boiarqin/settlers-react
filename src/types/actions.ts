import { Color, IEdge, ITradingResources, IVertex } from './index';

export interface IDefaultAction {
    type: string;
};

export interface IDistributeResourcesAction extends IDefaultAction {
    dieRoll: number;
};

export interface IDiscardResourcesAction extends IDefaultAction {
    discardedResources: ITradingResources;
};

export interface IInitialMoveAction extends IDefaultAction {
    townVertex: number;
    roadEdge: IEdge;
};

export interface IThiefAction extends IDefaultAction {
    newHex: number;
    targetPlayer: Color;
};

export interface IBuildRoadAction extends IDefaultAction {
    targetEdge: IEdge;
};

export interface IBuildTownAction extends IDefaultAction {
    targetVtx: IVertex;
};

export interface IPlayKnightAction extends IDefaultAction {
    targetPlayer: Color;
};

export interface IOfferTradeAction extends IDefaultAction {
    targetPlayer?: Color;
    myResources: ITradingResources;
    targetResources: ITradingResources;
};