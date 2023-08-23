import "./styles/styles.scss";
import { Calculator } from "./components/Calculator/Calculator";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Wordle/Game";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/wordle-clone" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
