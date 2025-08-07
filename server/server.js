const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory storage for survey results
let surveyResults = [];

// Endpoint to serve survey config
app.get('/api/config', (req, res) => {
  try {
    const configPath = path.join(__dirname, 'config.json');
    const configData = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData);
    res.json(config);
  } catch (error) {
    console.error('Error reading config file:', error);
    res.status(500).json({ error: 'Failed to load survey configuration' });
  }
});

// Endpoint to submit survey results
app.post('/api/results', (req, res) => {
  try {
    const result = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      answers: req.body.answers || {},
      ...req.body
    };
    
    surveyResults.push(result);
    res.status(201).json({ message: 'Survey result saved successfully', id: result.id });
  } catch (error) {
    console.error('Error saving survey result:', error);
    res.status(500).json({ error: 'Failed to save survey result' });
  }
});

// Endpoint to get survey results
app.get('/api/results', (req, res) => {
  try {
    res.json({
      results: surveyResults,
      count: surveyResults.length
    });
  } catch (error) {
    console.error('Error retrieving survey results:', error);
    res.status(500).json({ error: 'Failed to retrieve survey results' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Survey server running on port ${PORT}`);
  console.log(`Config endpoint: http://localhost:${PORT}/api/config`);
  console.log(`Results endpoint: http://localhost:${PORT}/api/results`);
});