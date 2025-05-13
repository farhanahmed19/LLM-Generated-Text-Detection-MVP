import React from 'react';

const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <div style={{ width: '40px', height: '40px', border: '4px solid #ccc', borderTop: '4px solid #0ea5e9', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
  </div>
);

export default LoadingSpinner;
