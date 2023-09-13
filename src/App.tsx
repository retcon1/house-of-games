import "./styles/styles.scss";
import { Route, Routes } from "react-router-dom";
import Calculator from "./components/Calculator/Calculator";
import Home from "./components/Home";
import Game from "./components/Wordle/Game";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/wordle-clone" element={<Game />} />
        <Route path="/noughts-and-crosses" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
