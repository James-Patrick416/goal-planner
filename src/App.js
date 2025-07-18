// App.js - The main wrapper for our application
// Handles routing and provides the main layout structure
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Add more routes here if needed for bonus features */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;