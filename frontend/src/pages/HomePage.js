import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { detectText } from '../api/api';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [binoculars, setBinoculars] = useState(null);
  const [t5, setT5] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDetect = async () => {
    if (!text.trim()) {
      alert('Please enter some text.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setBinoculars(null);
    setT5([]);

    try {
      const data = await detectText(text);
      if (!data || !data.answer) {
        throw new Error('Invalid response');
      }

      setResult(data.answer);
      setBinoculars(data.binoculars || 'N/A');
      setT5(data.t5_predictions || []);
    } catch (err) {
      console.error(err);
      setError('Failed to get a valid response from the backend.');
    } finally {
      setLoading(false);
    }
  };

  const handleSeeSource = () => {
    if (t5.length > 0) {
      navigate('/source', { state: { t5 } });
    }
  };

  return (
    <div className="container">
      <h1>🧠 Detect Text</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <textarea
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            backgroundColor: 'rgba(30, 30, 47, 0.4)',
            border: '1px solid #ccc',
            borderRadius: '10px',
            width: '90%',
            maxWidth: '700px',
            height: '180px',
            padding: '15px',
            fontSize: '16px',
            color: '#fff',
            backdropFilter: 'blur(3px)',
            resize: 'vertical',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            outline: 'none',
          }}
        />
      </div>
      <br />
      <button onClick={handleDetect} disabled={loading}>
        {loading ? 'Detecting...' : 'Detect Text'}
      </button>

      {loading && <LoadingSpinner />}
      {error && <p className="result-fail">{error}</p>}

      {result && (
        <>
          <p className={result === 'Human' ? 'result-success' : 'result-fail'}>
            Final Decision: {result}
          </p>
          <p style={{ marginTop: '10px' }}>Binoculars Prediction: <strong>{binoculars}</strong></p>

          {result !== 'Human' && t5.length > 0 && (
            <button style={{ marginTop: '20px' }} onClick={handleSeeSource}>
              See LLM Source
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
