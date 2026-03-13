import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Platform API')
    .setDescription('Multi-tenant SaaS API')
    .setVersion('1.0.0')
    .build();

  const doc = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, doc);

  const port = configService.get<number>('API_PORT', 4000);

  await app.listen(port);

  console.log(`🚀 Application running on: ${await app.getUrl()}`);
}

bootstrap().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
