import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  const logger = app.get(Logger);
  const sConfig = new DocumentBuilder()
    .setTitle('OAuth2 with Session')
    .setDescription('Description of Api tools')
    .addApiKey({ type: 'apiKey', name: 'cookie', in: 'header' }, 'cookie')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, sConfig);
  SwaggerModule.setup('api', app, document);
  const server = await app.listen(3000, async () => {
    logger.log(`Application is running on: ${await app.getUrl()}`);
  });
  server.setTimeout(1800000);
}
bootstrap();
