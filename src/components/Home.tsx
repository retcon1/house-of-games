import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const calcNav = (e: MouseEvent) => {
    e.preventDefault();
    navigate("/calculator");
  };

  const wordleNav = (e: MouseEvent) => {
    e.preventDefault();
    navigate("/wordle-clone");
  };

  const noughtsNav = (e: MouseEvent) => {
    e.preventDefault();
    navigate("/noughts-and-crosses");
  };

  return (
    <div className="home-screen">
      <h1 className="title">House of Games</h1>
      <button className="game-btn" onClick={calcNav}>
        Calculator
      </button>
      <button className="game-btn" onClick={wordleNav}>
        Wordle
      </button>
      <button className="game-btn" onClick={noughtsNav}>
        Noughts & Crosses
      </button>
    </div>
  );
};
