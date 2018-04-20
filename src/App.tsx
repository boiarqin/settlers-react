import * as React from 'react';
import Board from './board/board';
import Scores from './scores/scores';

import './App.css';

// data
import edgeList from './constants/edgeList';
import hexList from './constants/hexList';
import {playerColors, playerScoreboard } from './constants/players';
import numVertices from './constants/vertices';

class App extends React.Component {
  public render() {
    const scoreboard = playerColors.map((color, index) => {
      return Object.assign({}, playerScoreboard,
        {
          playerColor: color,
          playerOrder: index
        }
      );
    });

    const vertexList = [];
    for (let x = 0; x < numVertices; x++){
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
