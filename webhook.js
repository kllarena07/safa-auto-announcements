import fetch from 'node-fetch';
import { configDotenv } from 'dotenv';

configDotenv();

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export async function sendDiscordMessage(message) {
  const payload = {
    content: message
  }

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('Discord message sent successfully to:', DISCORD_WEBHOOK_URL);
    } else {
      console.error('Error sending message:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
