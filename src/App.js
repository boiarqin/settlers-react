import React, { Component } from 'react';
import Board from './board/board';
import Scores from './scores/scores';
import './App.css';

//data
import hexList from './constants/hexList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-title">Settlers of Catan</h1>
        <p className="App-intro">
        </p>
        <Board hexList={hexList}></Board>
        <Scores></Scores>
      </div>
      
    );
  }
}

export default App;
