import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultChart from '../components/ResultChart';

const SourcePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const t5 = location.state?.t5 || [];

  // Determine the highest confidence label
  const topPrediction = t5.reduce((prev, curr) => prev.confidence > curr.confidence ? prev : curr, { label: 'Unknown', confidence: 0 });

  return (
    <div className="container">
      <h1>📡 Source LLM Detection</h1>

      <div style={{ marginTop: '20px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px' }}>
        <h2 style={{ color: '#0ea5e9' }}>Most Likely Source:</h2>
        <p style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}>{topPrediction.label}</p>
        <p>Confidence: {(topPrediction.confidence * 100).toFixed(2)}%</p>
      </div>

      <ResultChart chartData={t5} title="T5 Prediction Confidence" />

      <button style={{ marginTop: '30px' }} onClick={() => navigate('/detect')}>🔙 Back to Detection</button>
    </div>
  );
};

export default SourcePage;
