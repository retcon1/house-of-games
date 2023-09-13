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
    <div>
      <h4>House of Games</h4>
      <button onClick={calcNav}>Calculator</button>
      <button onClick={wordleNav}>Wordle</button>
      <button onClick={noughtsNav}>Noughts & Crosses</button>
    </div>
  );
};
