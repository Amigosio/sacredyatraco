import { GoogleGenAI } from '@google/genai';
import { Message } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const SYSTEM_INSTRUCTION = `You are a "Spiritual Guide" for Sacred Yatra Co., a premium travel agency specializing in Indian pilgrimages.
Your job is to answer questions about temple timings, dress codes, necessary rituals, historical significance, and general travel advice for spiritual destinations in India.
Be respectful, serene, and knowledgeable. Use a calm and helpful tone.
Destinations include Varanasi, Rishikesh, Char Dham, Rameshwaram, etc.
If asked about bookings, direct users to our packages or dashboard.
Always respond in Markdown.`;

export async function chatWithGuide(history: Message[], prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, but I am unable to connect with the divine wisdom at this moment. Please try again soon.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The path is momentarily clouded. Please try asking your question again.";
  }
}
