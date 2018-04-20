import React, { Component } from 'react';
import Board from './board/board';
import Scores from './scores/scores';
import './App.css';

//data
import hexList from './constants/hexList';
import edgeList from './constants/edgeList';
import numVertices from './constants/vertices';
import {playerScoreboard, playerColors } from './constants/players';

class App extends Component {
  render() {
    const scoreboard = playerColors.map((color, index) => {
      return Object.assign({}, playerScoreboard,
        {
          playerColor: color,
          playerOrder: index
        }
      );
    });

    let vertexList = [];
    for (var x = 0; x < numVertices; x++){
      vertexList.push({type: 'town'});
    };
    
    return (
      <div className="App">
        <h1 className="App-title">Settlers of Catan</h1>
        <p className="App-intro">
        </p>
        <Board
          hexList={hexList}
          edgeList={edgeList}
          vertexList={vertexList}
        >
        </Board>
        <Scores scoreboard={scoreboard}></Scores>

        <span>SVGs from http://game-icons.net/games/catan.html</span>
      </div>
      
    );
  }
}

export default App;
