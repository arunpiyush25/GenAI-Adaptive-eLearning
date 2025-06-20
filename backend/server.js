const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { classifyBloomLevel, getPersonalizedResponse } = require('./services/genaiService');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/query', async (req, res) => {
  const { userQuery } = req.body;
  if (!userQuery) {
    return res.status(400).json({ error: 'User query is required.' });
  }

  try {
    // Step 1: Classify Bloom's level
    const level = await classifyBloomLevel(userQuery);

    // Step 2: Personalize query based on level
    const { personalizedQuery, finalAnswer } = await getPersonalizedResponse(userQuery, level);

    res.json({ level, personalizedQuery, finalAnswer });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Backend is up and running!');
});

