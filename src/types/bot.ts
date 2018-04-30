import { Color, ICatanState, IEdge } from ".";

interface IAction {
    type: string;
}

// any bot must implement this interface
export interface ICatanBot {
    getOwnColor: () => Color;
    makeInitialMove1: (state: ICatanState) => {townVertex: number, roadEdge: IEdge};
    makeInitialMove2: (state: ICatanState) => {townVertex: number, roadEdge: IEdge};
    makeTurn: (state: ICatanState) => IAction;
    acceptOrDeclineTrade: (state: ICatanState, trade: any) => IAction;
}