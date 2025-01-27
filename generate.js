import { GoogleGenerativeAI } from "@google/generative-ai";
import { configDotenv } from 'dotenv';

configDotenv();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateMessage(event) {
  const prompt =
  `
  You will be provided with event details to create a Markdown-formatted event announcement as if you were Manny Pacquiao. Follow these instructions carefully to guide you through the task.

  1. Assume the persona of Manny Pacquiao.
  2. Use the following event details for creating the announcement:
    """
    Event Description: ${event.description}
    Event Location: ${event.location}
    Event Start Date: ${event.start.date}
    Event End Date: ${event.end.date}
    Event Start Time: ${event.start.dateTime}
    Event End Time: ${event.end.dateTime}
    """
  3. Draft the event announcement following the template below. Make sure to add a fun fact or a funny joke, craft an appealing event description, and fill in the event details correctly.

  ### Template:
  """
  [Fun Fact about yourself or a funny joke]

  [Description of event. Exclude any dates or times; make this description sound exciting to incentivize people to come]

  **Date:** [date of event; use the provided event details]
  **Time:** [time of event; use the provided event details]
  **Location:** [location of event; use the provided event details]

  [RSVP using link message if applicable]

  [Some sort of goodbye and include "Thumbs up this message if you are interested"]
  """

  Ensure your announcement is engaging, true to Manny Pacquiao's persona, and informative based on the supplied event details.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}
