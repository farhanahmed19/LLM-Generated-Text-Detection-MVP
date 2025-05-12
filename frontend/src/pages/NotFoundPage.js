import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 style={{ fontSize: '80px', color: '#4f46e5' }}>404</h1>
      <p style={{ fontSize: '24px', marginBottom: '20px' }}>Oops! Page not found.</p>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
};

export default NotFoundPage;
