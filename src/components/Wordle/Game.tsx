import React, { useEffect, useRef, useState } from "react";
import { Board } from "./Board";
import { boardMatrix } from "./utils/boardMatrix";
import Keyboard from "./Keyboard";
import { generateWordSet } from "./utils/wordSet";
import { GameContext } from "./utils/GameContext";
import GameOver from "./GameOver";
import { generate } from "random-words";
import { lookupWord } from "./utils/api";
import { applyButtonAnimation } from "../../utils/buttonAnimation";

//TODO Figure out a way to stop highlighting a letter in yellow if it has already been guessed

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
  const [dictMode, setDictMode] = useState(false);
  const dictModeButtonRef = useRef<HTMLButtonElement>(null);
  const modeBtn = useRef<HTMLDivElement | null>(null); // needed for animation

  const handleModeChange = () => {
    setBoard([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    setCurrAttempt({
      attempt: 0,
      letterPos: 0,
    });
    setGameOver({
      gameOver: false,
      guessedWord: false,
    });
    setDisabledLetters([""]);
    setDictMode(!dictMode);

    // Removes focus to avoid user making a guess and hitting the btn at same time
    if (dictModeButtonRef.current) {
      dictModeButtonRef.current.blur(); // Removes focus from the button
    }
  };

  useEffect(() => {
    applyButtonAnimation(modeBtn);
    if (!dictMode) {
      generateWordSet().then((words) => {
        setWordSet(words.wordSet);
        setCorrectWord(words.todaysWord.toUpperCase());
      });
    } else {
      setCorrectWord(
        generate({ minLength: 5, maxLength: 5 }).toString().toUpperCase()
      );
    }
  }, [dictMode]);

  const onSelectLetter = (keyVal: string) => {
    // Prevents more letters being typed if all cells are filled
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

  const onEnter = async () => {
    // Prevents enter if all letters are not filled
    if (currAttempt.letterPos !== 5) return;

    // Builds guess from inputted letters, ready to compare
    let currGuess = "";
    for (let i = 0; i < 5; i++) {
      currGuess += board[currAttempt.attempt][i];
    }

    // Handles guess logic using limited word set
    if (!dictMode) {
      if (wordSet.has(currGuess.toLowerCase())) {
        setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
      } else {
        alert("Word Not Found");
      }

      if (currAttempt.attempt === 5 && wordSet.has(currGuess.toLowerCase())) {
        setGameOver({ gameOver: true, guessedWord: false });
      }
    }

    // Handles guess logic with call to dictionary API
    if (dictMode) {
      if (await lookupWord(currGuess.toLowerCase())) {
        setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
      } else {
        alert("Word Not Found");
      }

      if (
        currAttempt.attempt === 5 &&
        (await lookupWord(currGuess.toLowerCase()))
      ) {
        setGameOver({ gameOver: true, guessedWord: false });
      }
    }

    if (currGuess === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
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
          {dictMode ? (
            <>
              <p>Click here to go back to a limited, sensible list of words!</p>
              <div className="btn-container" ref={modeBtn}>
                <button
                  className="mode-btn"
                  onClick={handleModeChange}
                  ref={dictModeButtonRef}
                >
                  Word Set Mode
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                Click here to expand the word list to the entire dictionary!
              </p>
              <div className="btn-container" ref={modeBtn}>
                <button
                  className="mode-btn"
                  onClick={handleModeChange}
                  ref={dictModeButtonRef}
                >
                  Dictionary Mode
                </button>
              </div>
            </>
          )}
        </div>
      </GameContext.Provider>
    </div>
  );
}

export default Game;
