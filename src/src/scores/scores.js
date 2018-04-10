import React from 'react';
import {calculateVP, countPlayedKnights} from '../utils/utils';
import './scores.css';
/*
import brickIcon from '../images/icons/brick-pile.svg';
import wheatIcon from '../images/icons/wheat.svg';
import oreIcon from '../images/icons/stone-pile.svg';
import sheepIcon from '../images/icons/sheep.svg';
import woodIcon from '../images/icons/wood-pile.svg';
*/

function SingleScore(props) {
    return (
        <div className="single-score">
            <h3>Player Name ({props.score.playerColor})</h3>
            <span>{props.totalVP} Victory Points</span>
            <h4>Resources</h4>
            <ul>
                <li>Bricks: {props.score.bricks}</li>
                <li>Wheat: {props.score.wheat}</li>
                <li>Ore: {props.score.ore}</li>
                <li>Sheep: {props.score.sheep}</li>
                <li>Lumber: {props.score.lumber}</li>
                <li>Knights: {props.playedKnights}</li>
            </ul>
            <h4>Trophies</h4>
            <ul>
            {!(props.score.hasLongestRoad || props.score.hasLargestArmy) && <li>None</li>}
            {props.score.hasLongestRoad && <li>Longest Road</li>}
            {props.score.hasLargestArmy && <li>Largest Army</li>}
            </ul>
        </div>
    );
};

function Scores(props) {
    const AllPlayerScores = props.scoreboard.map(score => {
        //calculate VP
        const totalVP = calculateVP(score);
        const playedKnights = countPlayedKnights(score.cards);
        //calculate knights
        return (
            <SingleScore
                key={score.playerColor}
                score={score}
                totalVP={totalVP}
                playedKnights={playedKnights}
            >
            </SingleScore>
        );
    })

    return (
        <div className="scores">
            {AllPlayerScores}
        </div>
    );
}

export default Scores;