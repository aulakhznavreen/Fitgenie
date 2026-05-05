import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY missing in .env');
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // *** CHANGE THIS LINE ***
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }); // Use the latest stable text model

  console.log(`Attempting to connect to Gemini API with model: ${model.model}`);

  try {
    const prompt = 'Hello from test! Please say something back.';
    console.log(`Sending prompt: "${prompt}"`);

    const result = await model.generateContent(prompt);
    const response = result.response;

    if (response && response.text) {
      console.log('✅ Generated text:', response.text());
    } else {
      console.log('ℹ️ No generated text found. Full response:', JSON.stringify(result, null, 2));
      if (response && response.promptFeedback && response.promptFeedback.blockReason) {
        console.warn('⚠️ Prompt was blocked due to:', response.promptFeedback.blockReason);
      }
    }
  } catch (error: any) {
    console.error('❌ Error during API call:', error.message || error);
    if (error.status) {
      console.error(`Status code: ${error.status}`);
    }
    if (error.details) {
      console.error(`Error details: ${JSON.stringify(error.details, null, 2)}`);
    }
  }
}

testGemini();