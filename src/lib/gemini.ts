import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBJvLFhWXZPrGFTFb1qp7jh3-cXknmwLCY");

// Small prompt-tuning: instruct Gemini to act like an AI astrologer/guide
export async function askGemini(userMessage: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are AstroGuide, an AI-powered Vedic astrology assistant.
      Be concise, kind, and give helpful insights related to the user's query.
      If it's unrelated to astrology, still answer politely as a general assistant.
      
      User: ${userMessage}
    `;

    const result = await model.generateContent(prompt);
    return result.response.text() || "I couldn’t find the stars’ answer right now 🌌.";
  } catch (err: any) {
    console.error("Gemini API error:", err);
    return "Sorry, I couldn’t connect to the cosmic realm right now.";
  }
}
