import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import SourcePage from './pages/SourcePage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/detect" element={<HomePage />} />
    <Route path="/source" element={<SourcePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default App;
