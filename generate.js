import { configDotenv } from 'dotenv';
import { CohereClient } from "cohere-ai";

configDotenv();

const COHERE_API_KEY = process.env.COHERE_API_KEY;

const cohere = new CohereClient({
  token: COHERE_API_KEY
})

const generatePrompt = (event) => {
  return `
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
  [Fun Fact about yourself or a funny joke; ensure it is a different one each time]

  [Description of event. Exclude any dates or times; make this description sound exciting to incentivize people to come]

  **Date:** [date of event; use the provided event details]
  **Time:** [time of event; use the provided event details]
  **Location:** [in-person location of event; use the provided event details] ([address here](https://maps.google.com/?q=[location]))

  [If there's an online option, include it here. Join us online via: [Event Link]]

  [RSVP using link message if one is provided. If not, exclude this part of the message]

  [Some sort of goodbye and include "Thumbs up this message if you are interested"]
  """

  Ensure your announcement is engaging, true to Manny Pacquiao's persona, and informative based on the supplied event details.
  `;
}

export async function generateMessage(event) {
  const prompt = generatePrompt(event);

  const response = await cohere.chat({
    model: 'command',
    message: prompt
  });

  return response.text;
}
