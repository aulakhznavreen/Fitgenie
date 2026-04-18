import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// 🔐 API Key check
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("❌ OPENAI_API_KEY missing");
  process.exit(1);
}

console.log("✅ OPENAI_API_KEY loaded");

const openai = new OpenAI({
  apiKey,
});

// 🧪 Health route
app.get("/api/hello", (_req, res) => {
  res.json({ message: "Backend running 🚀" });
});

// 🧠 Generate Plan
app.post("/api/generate-plan", async (req, res) => {
  const { goal, frequency, diet, equipment, targetAreas } = req.body;

  try {
    const prompt = `
You are an expert fitness coach.

Create a personalized fitness + nutrition plan.

User details:
- Goal: ${goal}
- Workout frequency: ${frequency}
- Diet: ${diet}
- Equipment: ${equipment}
- Target areas: ${targetAreas?.join(", ") || "Full body"}

Return in clean Markdown:

## Overview
## Weekly Workout Plan
## Daily Routine
## Diet Plan
## Tips
`;

    console.log("⚡ Generating plan...");

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // fast + cheap + good
      messages: [
        { role: "system", content: "You are a professional fitness coach." },
        { role: "user", content: prompt },
      ],
    });

    const plan = response.choices[0].message.content;

    console.log("✅ Plan generated");

    res.json({ plan });
  } catch (err: any) {
    console.error("❌ Error:", err.message);
    res.status(500).json({
      error: err.message || "Failed to generate plan",
    });
  }
});

// 🚀 Start server
app.listen(port, () => {
  console.log(`🔥 Server running on http://localhost:${port}`);
});