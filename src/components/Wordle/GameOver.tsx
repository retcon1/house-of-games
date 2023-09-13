import React, { useContext } from "react";
import { GameContext } from "./utils/GameContext";

function GameOver() {
  const { gameOver, setGameOver, correctWord, currAttempt } =
    useContext(GameContext);
  return (
    <div className="game-over">
      <h3>{gameOver.guessedWord ? "You Got It!" : "You Failed!"}</h3>
      <h1>The Word Was: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3> You got it in {currAttempt.attempt} attempts!</h3>
      )}
    </div>
  );
}

export default GameOver;
