import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Microservices from './components/Microservices';

const App: React.FC = () => {
  return (
    <div>
      <div className="d-flex flex-column flex-row-fluid position-relative p-7 overflow-hidden w-100 min-vh-100">
        <Routes>
          <Route path="/" element={<Microservices />} />
          <Route
            path="/login"
            element={
              <Login
                onLogin={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            }
          />
          <Route path="/microservices" element={<Microservices />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
