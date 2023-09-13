import "./styles/styles.scss";
import { Calculator } from "./components/Calculator/Calculator";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Game } from "./components/NoughtsAndCrosses/Game";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/noughts-and-crosses" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
