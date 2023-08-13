import { useState } from "react";
import { Board } from "./Board";

export const Game = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const cellClick = (index: number) => {
    const newBoard = [...board];

    // prevents duplicate clicks and checks for winner
    if (newBoard[index] || calculateWinner(newBoard)) {
      return;
    }
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetClick = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="noughts-and-crosses">
      <h1>Noughts & Crosses</h1>
      <div className="status">{status}</div>
      <Board board={board} onClick={cellClick} />
      <button onClick={resetClick}>RESET</button>
    </div>
  );
};

function calculateWinner(board: string[]): string | null {
  // Logic to check for a winner

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winPatterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every((element) => element)) {
    return "Draw!";
  }
  return null;
}
