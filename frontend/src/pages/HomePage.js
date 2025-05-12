import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { detectText } from '../api/api';
import LoadingSpinner from '../components/LoadingSpinner'; // <-- New

const HomePage = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDetect = async () => {
    if (!text.trim()) {
      alert('Please enter some text.');
      return;
    }

    setLoading(true);

    try {
      const data = await detectText(text);

      if (data.type === 'human') {
        setResult('human');
      } else if (data.type === 'ai') {
        setResult('ai');
        setSource(data.source); // Save the detected source!
      }
    } catch (error) {
      console.error('Detection failed:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSeeSource = () => {
    navigate('/source', { state: { source } }); // Pass source to Source Page
  };

  return (
    <div className="container">
      <h1>LLM Text Detector</h1>
      <textarea
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={handleDetect} disabled={loading}>
        {loading ? 'Detecting...' : 'Detect Text'}
      </button>

      {loading && <LoadingSpinner />}

      {result === 'human' && <p className="result-success">✅ This text is Human Written!</p>}
      {result === 'ai' && (
        <div>
          <p className="result-fail">🤖 This text is AI Generated!</p>
          <button onClick={handleSeeSource}>See Which LLM</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
