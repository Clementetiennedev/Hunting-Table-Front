import Home from "./component/home"
import Board from "./component/board"
import './App.css';
import ResponsiveAppBar from './component/layout';
import { Route, Routes } from 'react-router';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Board" element={<Board />} />
      </Routes>
    </div>
  );
}

export default App;
