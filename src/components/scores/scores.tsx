import * as React from 'react';
import { connect } from 'react-redux';
import {calculateVP, countPlayedKnights, getPlayerScores} from '../../utils/scoring';
import './scores.css';
/*
import brickIcon from '../images/icons/brick-pile.svg';
import wheatIcon from '../images/icons/wheat.svg';
import oreIcon from '../images/icons/stone-pile.svg';
import sheepIcon from '../images/icons/sheep.svg';
import woodIcon from '../images/icons/wood-pile.svg';
*/

import { ICatanState, IPlayerScore } from '../../types';

interface IScoresProps {
    scoreboard: IPlayerScore[];
};

interface ISingleScoresProps {
    score: IPlayerScore;
};

const mapStateToProps = (state: ICatanState, ownProps: IScoresProps):IScoresProps => ({
    scoreboard: getPlayerScores(state)
});

function SingleScore(props: ISingleScoresProps) {
    const totalVP = calculateVP(props.score);
    const playedKnights = countPlayedKnights(props.score.cards);

    return (
        <div className="single-score">
            <h3>{props.score.playerColor} ({props.score.playerName})</h3>
            <span>{totalVP} Victory Points</span>
            <h4>Resources</h4>
            <ul>
                <li>Bricks: {props.score.bricks}</li>
                <li>Wheat: {props.score.wheat}</li>
                <li>Ore: {props.score.ore}</li>
                <li>Sheep: {props.score.sheep}</li>
                <li>Lumber: {props.score.lumber}</li>
                <li>Knights: {playedKnights}</li>
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

function Scores(props: IScoresProps) {
    const AllPlayerScores = props.scoreboard.map(score => {
        return (
            <SingleScore
                key={score.playerColor}
                score={score}
            />
        );
    })

    return (
        <div className="scores">
            {AllPlayerScores}
        </div>
    );
}

export default connect<IScoresProps>(mapStateToProps)(Scores);