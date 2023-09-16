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
import FancyButton from "../../utils/FancyButton";

export const WordleGame = () => {
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
  const modeBtnRef = useRef<HTMLButtonElement | null>(null);

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

    if (modeBtnRef.current) {
      modeBtnRef.current.blur();
    }
  };

  useEffect(() => {
    applyButtonAnimation(modeBtnRef);
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
    if (currAttempt.letterPos !== 5) return;

    let currGuess = "";
    for (let i = 0; i < 5; i++) {
      currGuess += board[currAttempt.attempt][i];
    }

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
        <div className="wordle-container">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </GameContext.Provider>
      {dictMode ? (
        <>
          <p>Click here to go back to a limited, sensible list of words!</p>
          <div className="fancy-btn-container">
            <FancyButton
              className="fancy-btn mode-btn"
              onClick={handleModeChange}
              ref={modeBtnRef}
              text="Word Set Mode"
            />
          </div>
        </>
      ) : (
        <>
          <p>Click here to expand the word list to the entire dictionary!</p>
          <div className="fancy-btn-container">
            <FancyButton
              className="fancy-btn mode-btn"
              onClick={handleModeChange}
              ref={modeBtnRef}
              text="Dictionary Mode"
            />
          </div>
        </>
      )}
    </div>
  );
};
