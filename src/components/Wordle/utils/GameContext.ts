import { createContext } from "react";

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
  correctWord: string;
  disabledLetters: string[];
  setDisabledLetters: React.Dispatch<React.SetStateAction<string[]>>;
  gameOver: { gameOver: boolean; guessedWord: boolean };
  setGameOver: React.Dispatch<
    React.SetStateAction<{ gameOver: boolean; guessedWord: boolean }>
  >;
}

export const GameContext = createContext<GameContextType>({
  board: [[""]],
  setBoard: () => {},
  currAttempt: { attempt: 0, letterPos: 0 },
  setCurrAttempt: () => {},
  onSelectLetter: () => {},
  onDelete: () => {},
  onEnter: () => {},
  correctWord: "",
  disabledLetters: [""],
  setDisabledLetters: () => [],
  gameOver: { gameOver: false, guessedWord: false },
  setGameOver: () => {},
});
