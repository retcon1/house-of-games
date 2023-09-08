import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const calcNav = (e: any) => {
    e.preventDefault();
    navigate("/calculator");
  };

  const wordleNav = (e: any) => {
    e.preventDefault();
    navigate("/wordle-clone");
  };

  return (
    <div>
      <h4>House of Games</h4>
      <button onClick={calcNav}>Calculator</button>
      <button onClick={wordleNav}>Wordle</button>
    </div>
  );
};

export default Home;
