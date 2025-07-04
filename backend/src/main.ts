import { Handler, Context, Callback } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const expressApp = express();
let server: Handler;

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  await nestApp.init();
  server = serverlessExpress({ app: expressApp });
}

bootstrap();

const config = new DocumentBuilder()
  .setTitle('Celeb Network API')
  .setDescription('API for celebrities and fans')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

export const handler: Handler = (event: any, context: Context, callback: Callback) => {
  server(event, context, callback);
};
