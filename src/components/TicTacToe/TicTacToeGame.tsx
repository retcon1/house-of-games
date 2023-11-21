import { MouseEvent, useEffect, useRef, useState } from "react";
import { Board } from "./Board";
import { aiMove, calculateWinner } from "./util";
import { applyButtonAnimation } from "../../utils/buttonAnimation";
import FancyButton from "../../utils/FancyButton";
import { useNavigate } from "react-router-dom";

export const TicTacToeGame = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [ai, setAi] = useState(false);
  const buttonResetRef = useRef<HTMLButtonElement | null>(null);
  const buttonAiRef = useRef<HTMLButtonElement | null>(null);

  // used for button animations
  useEffect(() => {
    applyButtonAnimation(buttonAiRef);
    applyButtonAnimation(buttonResetRef);
  }, []);

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

  const aiClick = () => {
    setXIsNext(true);
    setBoard(Array(9).fill(null));
    setXScore(0);
    setOScore(0);
    setAi(!ai);
  };

  const winner = calculateWinner(board);

  const resetClick = () => {
    if (winner === "O") {
      setOScore(oScore + 1);
    } else if (winner === "X") {
      setXScore(xScore + 1);
    }
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  const navigate = useNavigate();
  const homeNav = (e: MouseEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="noughts-and-crosses">
      <FancyButton className="home-btn" onClick={homeNav} text="Go Home" />
      <h1>Noughts & Crosses</h1>
      {oScore || xScore ? (
        <div className="scoreboard">
          X Score: {xScore} <br /> O Score: {oScore}
        </div>
      ) : null}
      <div className="status">{status}</div>
      <Board board={board} onClick={cellClick} />
      <FancyButton
        className="reset"
        ref={buttonResetRef}
        onClick={resetClick}
        text="Reset"
      />
      <FancyButton
        className="ai"
        ref={buttonAiRef}
        onClick={aiClick}
        text={ai ? "Play With Friends" : "Play With AI"}
      />
    </div>
  );
};
