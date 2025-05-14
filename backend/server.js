const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

const t5_endpoint = "https://5v8gj7setfu316-4000.proxy.runpod.net/predict";
const binoculars_endpoint = "https://53borb89nifevy-4000.proxy.runpod.net/predict";
const CLASSES = ["Human", "GPT-4", "Claude 3.5 Haiku", "Gemini 2.0 Flash"];

app.use(cors());
app.use(express.json());

app.post('/detect', async (req, res) => {
  const { text } = req.body;
  console.log('Received text:', text);

  let answer = 'Human';
  let binoculars = 'Human-written';
  let t5_predictions = [
    { label: 'Human', confidence: 0.85 },
    { label: 'GPT', confidence: 0.1 },
    { label: 'Claude', confidence: 0.03 },
    { label: 'Gemini', confidence: 0.02 }
  ];

  // Payload will remain same for both API calls
  let payload = {
    uid: "001",
    text: text,
    extra: "None"
  };
  // Binoculars Endpoint API call
  const binoculars_response = await fetch(binoculars_endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });
  const binoculars_data = await binoculars_response.json();
  console.log(binoculars_data)
  binoculars = String(binoculars_data["prediction"])

  // Binoculars Endpoint API call
  const t5_response = await fetch(t5_endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });
  const t5_data = await t5_response.json();
  console.log(t5_data)
  t5_per_class = t5_data["per_class"]
  t5_predictions = [
    { label: 'Human', confidence: t5_per_class[0] },
    { label: 'GPT', confidence: t5_per_class[1] },
    { label: 'Claude', confidence: t5_per_class[2] },
    { label: 'Gemini', confidence: t5_per_class[3] },
  ];
  // Getting highest probability class from T5-Multi
  let index = -1, second_index = -1;
  let maximum = -31;
  for (let i = 0; i < 4; i++) {
    if (maximum < t5_per_class[i]) {
      if (index != -1) {
        second_index = index;
      }
      maximum = t5_per_class[i];
      index = i;
    }
  }
  // console.log(t5_per_class)

  // Rules

  // Rule #01:
  // Binoculars: Human-generated
  // T5: Human
  // Answer: Human
  if (binoculars === "Human-written" && index === 0) {
    answer = 'Human';
  }

  // Rule #04:
  // Binoculars: AI-generated
  // T5: GPT/Claude/Gemini
  // Answer: Highest probability class
  else if (binoculars === "AI-generated" && index != 0) {
    answer = '🤖 AI'.concat(" (", CLASSES[index], ")");
  }

  // Rule #02:
  // Binoculars: Human-generated
  // T5: GPT/Claude/Gemini
  // Answer: Human if the highest probability class has less than 0.9 probability, else the highest probability class
  else if (binoculars === "Human-written" && index != 0) {
    if (t5_per_class[index] >= 0.99)
      answer = '🤖 AI'.concat(" (", CLASSES[index], ")");
    else
      answer = 'Human';
  }

  // Rule #03:
  // Binoculars: AI-generated
  // T5: Human-generated
  // Answer: Human if the highest probability class has greater than or equal to 0.9 probability, else the highest probability AI class
  else if (binoculars === "AI-generated" && index == 0) {
    if (t5_per_class[0] >= 0.99)
      answer = 'Human';
    else
      answer = '🤖 AI'.concat(" (", CLASSES[second_index], ")");
  }



  // Dummy rule: if text includes "ai" -> AI, otherwise Human
  // if (text.toLowerCase().includes('ai')) {
  //   answer = '🤖 AI';
  //   binoculars = 'AI-generated';
  //   t5_predictions = [
  //     { label: 'GPT', confidence: 0.92 },
  //     { label: 'Claude', confidence: 0.04 },
  //     { label: 'Gemini', confidence: 0.03 },
  //     { label: 'Human', confidence: 0.01 }
  //   ];
  // }

  res.json({
    answer,
    binoculars,
    t5_predictions
  });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
