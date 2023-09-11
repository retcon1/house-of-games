import React, { useContext, useEffect } from "react";
import { GameContext } from "./utils/GameContext";

function Letter({
  letterPos,
  attemptVal,
}: {
  letterPos: number;
  attemptVal: number;
}) {
  const { board, correctWord, currAttempt, setDisabledLetters } =
    useContext(GameContext);

  // Selects the letter in the board matrix
  const letter = board[attemptVal][letterPos];

  // Initiates variables if they meet the requirements
  const correct = correctWord[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.includes(letter);

  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);

  return (
    <div className="letter" id={letterState ? letterState : ""}>
      {letter}
    </div>
  );
}

export default Letter;
