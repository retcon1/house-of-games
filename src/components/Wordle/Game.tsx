import React, { useEffect, useState } from "react";
import { Board } from "./Board";
import { boardMatrix } from "./utils/boardMatrix";
import Keyboard from "./Keyboard";
import { generateWordSet } from "./utils/wordSet";
import { GameContext } from "./utils/GameContext";
import GameOver from "./GameOver";

//TODO Make sure the game doesn't end if you guess a non-existent word on the last guess
//TODO Figure out a way to stop highlighting a letter in yellow if it has already been guessed
//TODO Re-integrate dictionary checking/random-word word gen, at least have as an option for players

function Game() {
  const [board, setBoard] = useState(boardMatrix);
  const [currAttempt, setCurrAttempt] = useState({
    attempt: 0,
    letterPos: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([""]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord.toUpperCase());
    });
  }, []);

  const onSelectLetter = (keyVal: string) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currGuess = "";
    for (let i = 0; i < 5; i++) {
      currGuess += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currGuess.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("Word not found");
    }

    if (currGuess === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };

  return (
    <div className="wordle-game">
      <nav>
        <h1>Wordle Clone</h1>
      </nav>
      <GameContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </GameContext.Provider>
    </div>
  );
}

export default Game;
