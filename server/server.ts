import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { SurveyConfig, SurveyResult } from "./types";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const configPath = path.join(__dirname, 'survey_config.json');
const configData = fs.readFileSync(configPath, 'utf8');
const config: SurveyConfig = JSON.parse(configData);

app.get('/api/config', (req: Request, res: Response) => {
  try {
    res.json(config);
  } catch (error) {
    console.error('Error reading config file:', error);
    res.status(500).json({ error: 'Failed to load survey configuration' });
  }
});

app.post('/api/results', (req: Request, res: Response) => {
  try {
    function objectToSeed(obj: SurveyResult): number {
      let hash = 0;
      const str = JSON.stringify(obj);

      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }

      return Math.abs(hash);
    }

    let seed = objectToSeed(req.body);

    const result = config.parties.map((party) => {
      seed = (seed * 1664525 + 1013904223) % Math.pow(2, 32);
      return {
        [party.code]: Number((seed / Math.pow(2, 32)).toFixed(4)),
      }
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error saving survey result:', error);
    res.status(500).json({ error: 'Failed to save survey result' });
  }
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Survey server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
});