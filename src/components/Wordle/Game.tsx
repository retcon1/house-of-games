import { useState } from "react";

const Game = () => {
  const word = ["v", "i", "d", "e", "o"];
  const [guess, setGuess] = useState("");
  const [guessNum, setGuessNum] = useState(0);

  const handleGuess = (event: React.FormEvent) => {
    event.preventDefault();
    const formattedGuess = guess.toLowerCase().split("");
    for (let i = 0; i < word.length; i++) {
      let cell = document.querySelector(
        `.guess${guessNum + 1}-${i}`
      ) as HTMLElement;
      if (cell) {
        cell.textContent = formattedGuess[i];
        if (word[i] === formattedGuess[i]) {
          cell.style.backgroundColor = "green";
        } else if (word.includes(formattedGuess[i])) {
          cell.style.backgroundColor = "yellow";
        } else {
          cell.style.backgroundColor = "red";
        }
      }
    }

    // Use the functional form of setGuessNum and setGuess
    setGuessNum((prevGuessNum) => prevGuessNum + 1);
    setGuess("");
  };

  return (
    <>
      <form className="Input" onSubmit={handleGuess}>
        <input
          value={guess}
          onChange={(event) => setGuess(event.target.value)}
          maxLength={5}
        />
        <button type="submit" disabled={guess.length !== 5 || guessNum === 5}>
          Make Your Guess
        </button>
      </form>
      <section className="grid-col">
        <>
          <div className="cell guess1-0"></div>
          <div className="cell guess1-1"></div>
          <div className="cell guess1-2"></div>
          <div className="cell guess1-3"></div>
          <div className="cell guess1-4"></div>
        </>
        <>
          <div className="cell guess2-0"></div>
          <div className="cell guess2-1"></div>
          <div className="cell guess2-2"></div>
          <div className="cell guess2-3"></div>
          <div className="cell guess2-4"></div>
        </>
        <>
          <div className="cell guess3-0"></div>
          <div className="cell guess3-1"></div>
          <div className="cell guess3-2"></div>
          <div className="cell guess3-3"></div>
          <div className="cell guess3-4"></div>
        </>
        <>
          <div className="cell guess4-0"></div>
          <div className="cell guess4-1"></div>
          <div className="cell guess4-2"></div>
          <div className="cell guess4-3"></div>
          <div className="cell guess4-4"></div>
        </>
        <>
          <div className="cell guess5-0"></div>
          <div className="cell guess5-1"></div>
          <div className="cell guess5-2"></div>
          <div className="cell guess5-3"></div>
          <div className="cell guess5-4"></div>
        </>
      </section>
    </>
  );
};
export default Game;
