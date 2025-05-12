import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import SourcePage from './pages/SourcePage';
import NotFoundPage from './pages/NotFoundPage'; // <-- New

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/detect" element={<HomePage />} />
      <Route path="/source" element={<SourcePage />} />
      <Route path="*" element={<NotFoundPage />} /> {/* Wildcard route */}
    </Routes>
  );
};

export default App;
