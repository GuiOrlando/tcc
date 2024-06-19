import React from 'react';
import './App.css';
import CarroList from './pages/CarroList';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import { AuthProvider } from './context/authContext';
import PrivateRoute from './components/privateRoutes';
import pages from './pages/pages';

function App() {
  return (
    <div className="App">
      <div className="App-content">
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path={pages.routes.Login} element={<Login />} />
              <Route path={pages.routes.Signup} element={<Signup />} />
              <Route path={pages.routes.CarroList} element={<PrivateRoute><CarroList /></PrivateRoute>} />
              <Route path={pages.routes.HomePage} element={<PrivateRoute><HomePage /></PrivateRoute>} />
              <Route path="*" element={<Navigate to={pages.routes.Login} />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
