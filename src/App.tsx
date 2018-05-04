import * as React from 'react';
import { connect } from 'react-redux';
import Board from './components/board/board';
import Narrative from './components/narrative/narrative';
import Scores from './components/scores/scores';

import './App.css';

import {
  BUILD_DEVELOPMENT_CARD,
  BUILD_ROAD,
  BUILD_TOWN,
  distributeResources,
  END_PLAYER_TURN,
  endPlayerTurn,
  initialMove1,
  initialMove2,
  UPGRADE_TOWN
} from './actions';
import { createBasicBot } from './bots/basic.bot';
import { ICatanState, IEdge } from './types';
import { ICatanBot } from './types/bot';
import { playerHasWon } from './utils/scoring';
import {
  getCurrentPlayerColor,
  rollADie
} from './utils/utils';

interface IAppProps {
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
      let nextAction = { type: 'TBD' };
      while(nextAction.type !== 'END_PLAYER_TURN'){
        nextAction = currentPlayer.makeTurn(this.props.gameState);
        // double check action types
        switch(nextAction.type) {
          case BUILD_ROAD:
          case BUILD_TOWN:
          case UPGRADE_TOWN:
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
      </div>
      
    );
  }
}

export default connect<IAppProps>(mapStateToProps, mapDispatchToProps)(App);
