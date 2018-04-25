import * as React from 'react';
import Board from './board/board';
import Scores from './scores/scores';

import './App.css';

import {getPlayerScores, initializeState} from './utils/scoring';

// data
import {
  edgeList,
  hexList,
} from './constants';

class App extends React.Component {
  public render() {
    const initialState = initializeState();
    const scoreboard = getPlayerScores(initialState);

    const vertexList = [];
    for (let x = 0; x < initialState.totalVertices; x++){
      vertexList.push({type: 'town'});
    };
    
    return (
      <div className="App">
        <h1 className="App-title">Settlers of Catan</h1>
        <p className="App-intro"/>
        <Board
          hexList={hexList}
          edgeList={edgeList}
          vertexList={vertexList}
        />
        <Scores scoreboard={scoreboard}/>

        <span>SVGs from http://game-icons.net/games/catan.html</span>
      </div>
      
    );
  }
}

export default App;
