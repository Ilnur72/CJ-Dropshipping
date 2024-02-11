import { NestFactory } from '@nestjs/core';
import { TypesenseService } from './services/typesense.service';
import { AppModule } from '../../app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const typesenseService = app.get(TypesenseService);

  try {
    const product = await typesenseService.sendProduct();
    console.log(product);
  } catch (error) {
    console.error(error);
  } finally {
    await app.close();
  }
}

bootstrap();
