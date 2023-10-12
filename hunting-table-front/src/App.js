import Home from "./component/home"
import Board from "./component/board"
import Login from "./component/login"
import Register from "./component/register"
import Exo from "./component/exo"
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
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="Exo" element={<Exo />} />
      </Routes>
    </div>
  );
}

export default App;
