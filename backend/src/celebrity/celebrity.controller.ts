import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  UseGuards,
  Res,
} from '@nestjs/common';
import { CelebrityService } from './celebrity.service';
import { Celebrity } from './celebrity.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Response } from 'express';
import * as pdf from 'html-pdf-node';

@Controller('celebrities')
export class CelebrityController {
  constructor(private readonly celebrityService: CelebrityService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('celebrity')
  create(@Body() body: Partial<Celebrity>) {
    return this.celebrityService.create(body);
  }

  @Get()
  findAll() {
    return this.celebrityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.celebrityService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('celebrity')
  update(@Param('id') id: string, @Body() body: Partial<Celebrity>) {
    return this.celebrityService.update(+id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('celebrity')
  remove(@Param('id') id: string) {
    return this.celebrityService.remove(+id);
  }

  @Get(':id/pdf')
  async generatePdf(@Param('id') id: string, @Res() res: Response) {
    const celeb = await this.celebrityService.findOne(+id);

    const htmlContent = `
      <h1>${celeb.name}</h1>
      <p><strong>Category:</strong> ${celeb.category}</p>
      <p><strong>Country:</strong> ${celeb.country}</p>
      <p><strong>Instagram:</strong> ${celeb.instagram}</p>
      <p><strong>Fanbase:</strong> ${celeb.fanbase.toLocaleString()}</p>
      <h3>Setlist:</h3>
      <ul>${celeb.setlist.map(song => `<li>${song}</li>`).join('')}</ul>
    `;

    const file = { content: htmlContent };
    const options = { format: 'A4' };

    const pdfBuffer = await pdf.generatePdf(file, options);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${celeb.name}.pdf`,
    });

    res.end(pdfBuffer);
  }
}
