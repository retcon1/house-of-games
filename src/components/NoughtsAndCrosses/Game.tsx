import { useState } from "react";
import { Board } from "./Board";
import { aiMove, calculateWinner } from "./util";

export const Game = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [ai, setAi] = useState(false);

  const cellClick = (index: number) => {
    const newBoard = [...board];

    // prevents duplicate clicks
    if (newBoard[index] || calculateWinner(newBoard)) {
      return;
    }

    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    // utilised in AI mode
    if (ai) {
      const aiMoveIndex = aiMove(newBoard);
      if (aiMoveIndex !== -1) {
        newBoard[aiMoveIndex] = "O";
        setBoard(newBoard);
        setXIsNext(true);
      }
    }
  };

  const resetClick = () => {
    if (winner === "O") {
      setOScore(oScore + 1);
    } else if (winner === "X") {
      setXScore(xScore + 1);
    }
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const aiClick = () => {
    setXIsNext(true);
    setBoard(Array(9).fill(null));
    setAi(!ai);
  };

  const winner = calculateWinner(board);

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="noughts-and-crosses">
      <h1>Noughts & Crosses</h1>
      {oScore || xScore ? (
        <div className="scoreboard">
          X Score: {xScore} <br /> O Score: {oScore}
        </div>
      ) : null}
      <div className="status">{status}</div>
      <Board board={board} onClick={cellClick} />
      <button onClick={resetClick} className="reset-btn">
        RESET
      </button>
      <button onClick={aiClick} className="ai-btn">
        Play against AI
      </button>
    </div>
  );
};
