import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SourcePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const source = location.state?.source || 'Unknown Source';

  return (
    <div className="container">
      <h1>AI Source Detection</h1>
      <p style={{ fontSize: '20px', color: 'blue', marginBottom: '30px' }}>
        Detected Source: {source}
      </p>
      <button onClick={() => navigate('/detect')}>Back to Detection</button>
    </div>
  );
};

export default SourcePage;
