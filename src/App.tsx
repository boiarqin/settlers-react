import * as React from 'react';
import { connect } from 'react-redux';
import Board from './components/board/board';
import Narrative from './components/narrative/narrative';
import Scores from './components/scores/scores';

import './App.css';

import {
  BANK_TRADE,
  BUILD_DEVELOPMENT_CARD,
  BUILD_ROAD,
  BUILD_TOWN,
  buildRoad,
  buildTown,
  distributeResources,
  END_PLAYER_TURN,
  endPlayerTurn,
  initialMove1,
  initialMove2,
  UPGRADE_TOWN
} from './actions';
import { createBasicBot } from './bots/basic.bot';
import { ICatanState, IEdge } from './types';
import { IDefaultAction } from './types/actions';
import { IBotMakeTurnAction, ICatanBot } from './types/bot';
import { playerHasWon } from './utils/scoring';
import {
  getCurrentPlayerColor,
  rollADie
} from './utils/utils';

interface IAppProps {
  dispatchBotMove: (botAction: IBotMakeTurnAction) => any,
  dispatchBuildRoad: (targetEdge: IEdge) => any,
  dispatchBuildTown: (targetVtx: number) => any,
  dispatchDistributeResources: (dieRoll: number) => any;
  dispatchEndPlayerTurn: () => any,
  dispatchInitialMove1: (townVertex: number, roadEdge: IEdge) => any;
  dispatchInitialMove2: (townVertex: number, roadEdge: IEdge) => any;
  gameState: ICatanState;
}

interface IAppState {
  players: {
    red: ICatanBot,
    orange: ICatanBot,
    green: ICatanBot,
    blue: ICatanBot
  }
}

const mapStateToProps = (state: ICatanState, ownProps: IAppProps) => ({
  ...ownProps,
  gameState : state
});


const mapDispatchToProps = (dispatch: any, ownProps:any) => ({
  dispatchBotMove: (botAction: IBotMakeTurnAction) => dispatch(botAction),
  dispatchBuildRoad: (targetEdge: IEdge) => dispatch(buildRoad(targetEdge)),
  dispatchBuildTown: (targetVtx: number) => dispatch(buildTown(targetVtx)),
  dispatchDistributeResources: (dieRoll: number) => dispatch(distributeResources(dieRoll)),
  dispatchEndPlayerTurn: () => dispatch(endPlayerTurn()),
  dispatchInitialMove1: (townVertex: number, roadEdge: IEdge) => dispatch(initialMove1(townVertex, roadEdge)),
  dispatchInitialMove2: (townVertex: number, roadEdge: IEdge) => dispatch(initialMove2(townVertex, roadEdge))
});

class App extends React.Component<IAppProps, IAppState> {
  private timerID: NodeJS.Timer;

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      players: {
        blue: createBasicBot('blue'),
        green: createBasicBot('green'),
        orange: createBasicBot('orange'),
        red: createBasicBot('red')
      }
    }
  }

  public componentDidMount() {
    this.timerID = setInterval(()=> this.tick(), 5000);
  }

  public componentWillUnmount() {
    clearInterval(this.timerID);
  }

  public tick() {
    /* tslint:disable */
    console.log('tick');
    /* tslint:enable */ 
    
    const turn = this.props.gameState.turn;
    const numPlayers = this.props.gameState.playerColors.length;
    const currentColor = getCurrentPlayerColor(this.props.gameState);
    const currentPlayer = this.state.players[currentColor];

    if (playerHasWon(this.props.gameState)) {
      clearInterval(this.timerID);
      // GAME OVER
    }
    if (turn >= 0 && turn < numPlayers) {
      // INITIAL MOVES 1
      const {townVertex, roadEdge} = currentPlayer.makeInitialMove1(this.props.gameState);
      this.props.dispatchInitialMove1(townVertex, roadEdge);
      this.props.dispatchEndPlayerTurn();
    } else if (turn >= numPlayers && turn < numPlayers*2) {
      // INITIAL MOVES 2
      const {townVertex, roadEdge} = currentPlayer.makeInitialMove2(this.props.gameState);
      this.props.dispatchInitialMove2(townVertex, roadEdge);
      this.props.dispatchEndPlayerTurn();
    } else {
      // NORMAL TURN
      // roll dice
      const dieRoll = rollADie() + rollADie();
      // tslint:disable  
      console.log(currentColor)
      // tslint:enable  
      // distribute resources or move thief
      if (dieRoll !== 7){
        
        this.props.dispatchDistributeResources(dieRoll);
      } else {
        // players with too many cards choose what to keep/discard
        /*

        currentPlayer.moveThief();
        dispatch(moveThief({})); 
        */
      }
      // get actions from user until user ends turn
      let nextAction : IBotMakeTurnAction = { type: 'TBD' } as IDefaultAction;
      while(nextAction.type !== 'END_PLAYER_TURN'){
        nextAction = currentPlayer.makeTurn(this.props.gameState);
        // tslint:disable  
        console.log(nextAction)
        // tslint:enable  
        // double check action types
        switch(nextAction.type) {
          case BUILD_ROAD:
          case BUILD_TOWN:
          case UPGRADE_TOWN:
          case BANK_TRADE:
            this.props.dispatchBotMove(nextAction);
          case BUILD_DEVELOPMENT_CARD:
          case END_PLAYER_TURN:
          default:
            this.props.dispatchEndPlayerTurn();
        }
      }
      // this.props.dispatchMakeTurn(dieRoll);
      // this.props.dispatchEndPlayerTurn();
    } 
  }

  public render() {

    return (
      <div className="App">
        <h1 className="App-title">Settlers of Catan</h1>
        <p className="App-intro"/>
        <div className="game-container">
          <div className="board-scores-container">
            <Board/>
            <Scores/>
          </div>
          <div className="narrative-container">
            <Narrative/>
          </div>
        </div>
        <span>SVGs from http://game-icons.net/games/catan.html</span>
        
        
        <svg width="120" height="140">
          <symbol id="houseIcon" viewBox="0 0 512 512">
            <g>
            <path d="M256 19.27L25.637 249.638 19.27 256 32 268.73l6.363-6.367L256 44.727l217.637 217.636L480 268.73 492.73 256l-6.367-6.363zM96 48v107.273l64-64.002V48zm160 20.727l-192 192V486h64V320h96v166h224V260.727zM288 320h96v80h-96z" fill="#fff" fillOpacity="1"/>
            </g>
          </symbol>
          <symbol id="villageIcon" viewBox="0 0 512 512">
            <g>
              <path d="M109.902 35.87l-71.14 59.284h142.28l-71.14-59.285zm288 32l-71.14 59.284h142.28l-71.14-59.285zM228.73 84.403l-108.9 90.75h217.8l-108.9-90.75zm-173.828 28.75v62h36.81l73.19-60.992v-1.008h-110zm23 14h16v18h-16v-18zm265 18v10.963l23 19.166v-16.13h16v18h-13.756l.104.087 19.098 15.914h-44.446v14h78v-39h18v39h14v-62h-110zm-194.345 48v20.08l24.095-20.08h-24.095zm28.158 0l105.1 87.582 27.087-22.574v-65.008H176.715zm74.683 14h35.735v34h-35.735v-34zm-76.714 7.74L30.37 335.153H319l-144.314-120.26zm198.046 13.51l-76.857 64.047 32.043 26.704H481.63l-108.9-90.75zm-23.214 108.75l.103.086 19.095 15.914h-72.248v77.467h60.435v-63.466h50v63.467h46v-93.466H349.516zm-278.614 16V476.13h126v-76.976h50v76.977h31.565V353.155H70.902zm30 30h50v50h-50v-50z"  fill="#fff" fillOpacity="1"/>
            </g>
          </symbol> 
        </svg>       
      </div>
      
    );
  }
}

export default connect<IAppProps>(mapStateToProps, mapDispatchToProps)(App);
