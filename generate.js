import { GoogleGenerativeAI } from "@google/generative-ai";
import { configDotenv } from 'dotenv';

configDotenv();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateMessage(event) {
  const prompt = `
  Pretend you are Manny Pacquiao. Using this persona achieve the following tasks:

  1. Using the following event details:
  =============================================
  Event Description: ${event.description}
  Event Location: ${event.location}
  Event Start Date: ${event.start.date}
  Event Start End: ${event.end.date}
  Event Start Time: ${event.start.dateTime}
  Event End Time: ${event.end.dateTime}
  =============================================
  
  2. Create an event announcement that is similar to this template. Use Markdown:
  =============================================
  [Fun Fact about yourself or a funny joke],

  [Description of event. Exclude any dates or times, make this description sound exciting so that it will incentivize people to come]

  **Date**: [date of event, use the provided event details. not the description]
  **Time:** [time of event, use the provided event details. not the description]
  **Location:** [location of event, use the provided event details. not the description]

  [RSVP using link message if applicable]

  [Some sort of goodbye and include a "Thumbs up this message if you are interested"]
  =============================================  
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}
