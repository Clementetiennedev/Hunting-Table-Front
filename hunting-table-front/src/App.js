import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import ResponsiveAppBar from './component/layout';
import Home from './component/home';
import Society from './component/Society/index';
import SocietyView from './component/Society/view';
import MySocietyView from './component/MySociety/view';
import Login from './component/login';
import Register from './component/register';
import History from './component/History/index';
import HistoryView from './component/History/view';
import NewHunt from './component/new-hunt';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {isAuthenticated ? (
            <>
              <Route path="Society" element={<Society />} />
              <Route path="Society/:id" element={<SocietyView />} />
              <Route path="History" element={<History />} />
              <Route path="History/:id" element={<HistoryView />} />
              <Route path="New-hunt" element={<NewHunt />} />
              <Route path="MySociety" element={<MySocietyView />} />
            </>
          ) : (
            <>
              <Route path="Login" element={<Login />} />
              <Route path="Register" element={<Register />} />
              {/* Redirect to Home if not authenticated */}
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </>
          )}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
