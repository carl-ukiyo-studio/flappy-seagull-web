import { Route, Routes } from "react-router-dom";
import Game from "./components/Game";
import Home from "./components/Home";
import "./App.css";
import Leaderboard from "./components/Leaderboard";

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  </div>
);

export default App;
