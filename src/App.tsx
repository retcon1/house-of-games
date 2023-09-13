import "./styles/styles.scss";
import { Route, Routes } from "react-router-dom";
import { Calculator } from "./components/Calculator/Calculator";
import { Home } from "./components/Home";
import { WordleGame } from "./components/Wordle/WordleGame";
import { TicTacToeGame } from "./components/TicTacToe/TicTacToeGame";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/wordle-clone" element={<WordleGame />} />
        <Route path="/noughts-and-crosses" element={<TicTacToeGame />} />
      </Routes>
    </div>
  );
}

export default App;
