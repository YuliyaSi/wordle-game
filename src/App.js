import './App.css';
import Board from "./components/Board/Board";
import Keyboard from "./components/Keyboard/Keyboard";
import {useState, createContext, useEffect} from "react";
import {boardDefault, generateWordSet} from "./words";
import GameOver from "./components/GameOver/GameOver";

export const AppContext = createContext();

function App() {
    const [board, setBoard] = useState(boardDefault);
    const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
    const [wordSet, setWordSet] = useState(new Set());
    const [disabledLetters, setDisabledLetters] = useState([]);
    const [gameover, setGameOver] = useState({gameover: false, guessedWord: false});
    const [correctWord, setCorrectWord] = useState('')


    useEffect(() => {
        generateWordSet().then(words => {
            setWordSet(words.wordSet);
            setCorrectWord(words.todayWord)
        })
    }, [])


    const onSelectLetter = (keyVal) => {
        if (currAttempt.letterPos > 4) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
        setBoard(newBoard);
        setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})
    }

    const onDeleteLetter = () => {
        if (currAttempt.letterPos === 0) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = '';
        setBoard(newBoard);
        setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1})
    }

    const onEnter = () => {
        if (currAttempt.letterPos !== 5) return;

        let currWord = '';

        for (let i = 0; i < 5; i++) {
            currWord += board[currAttempt.attempt][i]
        }

        if (wordSet.has(currWord.toLowerCase())) {
            setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0})
        } else {
            alert("Word not found!")
        }

        if (currWord.toLowerCase() === correctWord) {
            setGameOver({gameover: true, guessedWord: true});
            return;
        }

        if (currAttempt.attempt === 5) {
            setGameOver({gameover: true, guessedWord: false})
        }
    }

    return (
        <div className="App">
            <nav>
                <h1>Wordle</h1>
            </nav>
            <AppContext.Provider value={{
                board,
                setBoard,
                currAttempt,
                setCurrAttempt,
                onSelectLetter,
                onDeleteLetter,
                onEnter,
                correctWord,
                setDisabledLetters,
                disabledLetters,
                gameover,
                setGameOver
            }}>
                <Board/>
                {gameover.gameover ? <GameOver/> : <Keyboard/>}
            </AppContext.Provider>

        </div>
    );
}

export default App;
