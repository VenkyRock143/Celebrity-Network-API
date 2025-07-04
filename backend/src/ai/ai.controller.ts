import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('suggest')
  async suggestCelebrities(@Body('query') query: string) {
    return this.aiService.suggestCelebrities(query);
  }
}
