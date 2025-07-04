import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async suggestCelebrities(prompt: string) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Return 3 celebrities matching: "${prompt}" as a JSON array with fields: name, category, country, photoUrl.`,
          },
        ],
      });

      const content = response.choices[0].message?.content ?? '[]';
      const suggestions = JSON.parse(content);

      return {
        source: 'openai',
        suggestions,
      };
    } catch (error) {
      console.error('OpenAI failed:', error.message);

      return {
        source: 'fallback',
        suggestions: [
          {
            name: 'Irrfan Khan',
            category: 'Actor',
            country: 'India',
            photoUrl: 'https://upload.wikimedia.org/irrfan.jpg',
          },
          {
            name: 'Rajkummar Rao',
            category: 'Actor',
            country: 'India',
            photoUrl: 'https://upload.wikimedia.org/rajkummar.jpg',
          },
          {
            name: 'Manoj Bajpayee',
            category: 'Actor',
            country: 'India',
            photoUrl: 'https://upload.wikimedia.org/manoj.jpg',
          },
        ],
      };
    }
  }
}
