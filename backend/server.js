const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/detect', (req, res) => {
  const { text } = req.body;
  console.log('Received text:', text);

  // Dummy rule: if text includes "ai" -> AI, otherwise Human
  let answer = 'Human';
  let binoculars = 'Human-written';
  let t5_predictions = [
    { label: 'Human', confidence: 0.85 },
    { label: 'GPT', confidence: 0.1 },
    { label: 'Claude', confidence: 0.03 },
    { label: 'Gemini', confidence: 0.02 }
  ];

  if (text.toLowerCase().includes('ai')) {
    answer = '🤖 AI';
    binoculars = 'AI-generated';
    t5_predictions = [
      { label: 'GPT', confidence: 0.92 },
      { label: 'Claude', confidence: 0.04 },
      { label: 'Gemini', confidence: 0.03 },
      { label: 'Human', confidence: 0.01 }
    ];
  }

  res.json({
    answer,
    binoculars,
    t5_predictions
  });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
