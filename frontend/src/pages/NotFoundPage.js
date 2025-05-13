import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1 style={{ fontSize: '80px' }}>404</h1>
      <p style={{ fontSize: '24px', marginBottom: '20px' }}>Page not found</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default NotFoundPage;
