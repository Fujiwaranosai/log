import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { CustomExceptionFilter } from './filters/custom-exception-filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    options: {
      host: process.env.HOST ? process.env.HOST : 'localhost',
      port: process.env.PORT ? Number(process.env.PORT) : 7000,
    },
  });
  app.useGlobalFilters(new CustomExceptionFilter());
  app.listen(() => console.log('log microservice is running'));
}
bootstrap().then(() => console.log('done bootstrap'));
