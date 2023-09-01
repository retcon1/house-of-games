import { useEffect, useState } from "react";
import { lookupWord } from "../../utils/api";
import { generate } from "random-words";

const Game = () => {
  const [word, setWord] = useState<string>("");

  useEffect(() => {
    // Generate the word once when the component mounts
    const generatedWord = generate({ minLength: 5, maxLength: 5 }).toString();
    setWord(generatedWord);
    console.log(generatedWord);
  }, []); // Empty dependency array ensures this effect runs only once

  const [guess, setGuess] = useState<string>("");
  const [guessNum, setGuessNum] = useState<number>(0);
  const [notWord, setNotWord] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);

  const handleGuess = async (event: React.FormEvent) => {
    event.preventDefault();
    setNotWord(false);

    // checks if user got the word, skips everything else
    if (guess === word) {
      const cells = document.querySelectorAll(`.guess${guessNum + 1}`);
      for (let i = 0; i < word.length; i++) {
        (cells[i] as HTMLElement).style.backgroundColor = "green";
        (cells[i] as HTMLElement).textContent = word[i];
      }

      setWin(true);
    }

    // checks if the word is real
    else if (await lookupWord(guess)) {
      const formattedGuess = guess.toLowerCase().split("");
      for (let i = 0; i < word.length; i++) {
        let cell = document.querySelector(
          `.square-${guessNum + 1}-${i}`
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

      setGuessNum(guessNum + 1);
      setGuess("");
    } else {
      setNotWord(true);
      setGuess("");
    }
  };

  return (
    <>
      {notWord ? <h5 className="warn-msg"> That's not a word! </h5> : null}
      {win ? (
        <h5 className="win-msg"> Congrats! You got the word! </h5>
      ) : (
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
      )}

      <section className="grid-col">
        <>
          <div className="cell guess1 square-1-0"></div>
          <div className="cell guess1 square-1-1"></div>
          <div className="cell guess1 square-1-2"></div>
          <div className="cell guess1 square-1-3"></div>
          <div className="cell guess1 square-1-4"></div>
        </>
        <>
          <div className="cell guess2 square-2-0"></div>
          <div className="cell guess2 square-2-1"></div>
          <div className="cell guess2 square-2-2"></div>
          <div className="cell guess2 square-2-3"></div>
          <div className="cell guess2 square-2-4"></div>
        </>
        <>
          <div className="cell guess3 square-3-0"></div>
          <div className="cell guess3 square-3-1"></div>
          <div className="cell guess3 square-3-2"></div>
          <div className="cell guess3 square-3-3"></div>
          <div className="cell guess3 square-3-4"></div>
        </>
        <>
          <div className="cell guess4 square-4-0"></div>
          <div className="cell guess4 square-4-1"></div>
          <div className="cell guess4 square-4-2"></div>
          <div className="cell guess4 square-4-3"></div>
          <div className="cell guess4 square-4-4"></div>
        </>
        <>
          <div className="cell guess5 square-5-0"></div>
          <div className="cell guess5 square-5-1"></div>
          <div className="cell guess5 square-5-2"></div>
          <div className="cell guess5 square-5-3"></div>
          <div className="cell guess5 square-5-4"></div>
        </>
      </section>
    </>
  );
};
export default Game;
