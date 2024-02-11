import { NestFactory } from '@nestjs/core';
import { DropshippingService } from './services/dropshipping.service';
import { AppModule } from '../../app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dropshippingService = app.get(DropshippingService);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  try {
    const cateogry = await dropshippingService.getCategory();
    console.log(cateogry);
    await delay(5000);
    const product = await dropshippingService.getProducts();
    console.log(product);
  } catch (error) {
    console.error(error);
  } finally {
    await app.close();
  }
}

bootstrap();
