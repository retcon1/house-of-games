import React, { createContext, useState } from "react";
import { Board } from "./Board";
import { boardMatrix } from "../../utils/boardMatrix";
import Keyboard from "./Keyboard";

type BoardMatrix = string[][];

interface GameContextType {
  board: BoardMatrix;
  setBoard: React.Dispatch<React.SetStateAction<BoardMatrix>>;
  currAttempt: { attempt: number; letterPos: number };
  setCurrAttempt: React.Dispatch<
    React.SetStateAction<{ attempt: number; letterPos: number }>
  >;
  onSelectLetter: (arg0: string) => void;
  onDelete: () => void;
  onEnter: () => void;
}

export const GameContext = createContext<GameContextType>({
  board: boardMatrix, // Provide a default value for board
  setBoard: () => {}, // Provide a default value for setBoard
  currAttempt: { attempt: 0, letterPos: 0 },
  setCurrAttempt: () => {},
  onSelectLetter: () => {},
  onDelete: () => {},
  onEnter: () => {},
});

function Game() {
  const [board, setBoard] = useState(boardMatrix);
  const [currAttempt, setCurrAttempt] = useState({
    attempt: 0,
    letterPos: 0,
  });

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
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
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
        }}
      >
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </GameContext.Provider>
    </div>
  );
}

export default Game;
