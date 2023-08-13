import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const calcNav = (e: any) => {
    e.preventDefault();
    navigate("/calculator");
  };

  return (
    <div>
      <h4>House of Games</h4>
      <button onClick={calcNav}>Calculator</button>
    </div>
  );
};

export default Home;
