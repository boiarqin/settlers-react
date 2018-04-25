import * as React from 'react';
import Board from './components/board/board';
import Narrative from './components/narrative/narrative';
import Scores from './components/scores/scores';

import './App.css';

class App extends React.Component {
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

export default App;
