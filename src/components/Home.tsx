import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import FancyButton from "../utils/FancyButton";

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
      <FancyButton className="game-btn" onClick={calcNav} text="Calculator" />
      <FancyButton className="game-btn" onClick={wordleNav} text="Wordle" />
      <FancyButton
        className="game-btn"
        onClick={noughtsNav}
        text="Noughts & Crosses"
      />
    </div>
  );
};
