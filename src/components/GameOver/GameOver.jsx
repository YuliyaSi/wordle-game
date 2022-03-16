import React, {useContext} from 'react';
import {AppContext} from "../../App";

function GameOver() {
    const {gameover, currAttempt, correctWord} = useContext(AppContext);

    return (
        <div className={'gameover'}>
            <h3>{gameover.guessedWord ? 'You correctly guessed' : "You failed!"}</h3>
            <h1>Correct: {correctWord}</h1>
            {gameover.guessedWord && (<h3>You guessed in {currAttempt.attempt} attempts</h3>)}
            <div>
                <button onClick={() => document.location.reload()}>New Game</button>
            </div>
        </div>
    );
}

export default GameOver;