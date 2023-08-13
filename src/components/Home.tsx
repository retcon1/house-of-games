import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const calcNav = (e: any) => {
    e.preventDefault();
    navigate("/calculator");
  };

  const noughtsNav = (e: any) => {
    e.preventDefault();
    navigate("/noughts-and-crosses");
  };

  return (
    <div>
      <h4>House of Games</h4>
      <button onClick={calcNav}>Calculator</button>
      <button onClick={noughtsNav}>Noughts & Crosses</button>
    </div>
  );
};
