import React, { Component } from 'react';
import Board from './board/board';
import Scores from './scores/scores';
import './App.css';

//data
import hexList from './constants/hexList';
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
    
    return (
      <div className="App">
        <h1 className="App-title">Settlers of Catan</h1>
        <p className="App-intro">
        </p>
        <Board hexList={hexList}></Board>
        <Scores scoreboard={scoreboard}></Scores>
      </div>
      
    );
  }
}

export default App;
