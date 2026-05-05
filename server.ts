// server.ts

import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

// DEBUG: Log the API key presence
console.log('Loaded GEMINI_API_KEY:', process.env.GEMINI_API_KEY || '[MISSING]');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const geminiApiKey = process.env.GEMINI_API_KEY;

if (!geminiApiKey) {
  console.error('❌ GEMINI_API_KEY is not set in your .env file. Server cannot start without it.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from server!' });
});

app.post('/api/generate-plan', async (req: Request, res: Response) => {
  const { goal, frequency, diet, equipment, targetAreas } = req.body;

  const prompt = `
As an expert fitness trainer and nutritionist, create a comprehensive and personalized fitness plan.
- Fitness goal: ${goal}
- Workouts per week: ${frequency}
- Dietary preference: ${diet}
- Available equipment: ${equipment === 'none' ? 'No specific equipment (bodyweight focus)' : equipment}
- Target areas: ${targetAreas.length > 0 ? targetAreas.join(', ') : 'full body'}

**Include:**
1. ## Overview
2. ## Weekly Workout Schedule
3. ## Daily Workout Structure
4. ## Dietary Guidance
5. ## Important Notes

Use **Markdown**, headings, bold text, and bullet points. No extra comments outside the plan.
`;

  try {
    console.log('Backend: Sending prompt to Gemini...');
    const result = await model.generateContent(prompt);
    const response = result.response;

    if (response && response.text) {
      const planText = response.text();
      console.log('Backend: Plan generated successfully.');
      res.json({ plan: planText });
    } else {
      console.error('Backend: No content returned from Gemini.');
      res.status(500).json({ error: 'Failed to generate plan' });
    }
  } catch (error: any) {
    console.error('Backend: Error generating plan:', error);
    res.status(500).json({ error: error.message || 'Failed to generate plan due to server error.' });
  }
});

app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});
