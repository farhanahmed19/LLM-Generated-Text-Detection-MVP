const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/detect', (req, res) => {
  const { text } = req.body;
  
  console.log('Received text:', text);

  // FAKE Logic: if text includes "ai" then it's AI Generated otherwise Human
  if (text.toLowerCase().includes('ai')) {
    // Respond as AI generated
    res.json({
      type: 'ai',
      source: 'OpenAI GPT-3'
    });
  } else {
    // Respond as Human written
    res.json({
      type: 'human'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Fake backend running at http://localhost:${PORT}`);
});
