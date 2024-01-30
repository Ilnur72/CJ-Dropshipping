import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { ProductService } from './product.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productService = app.get(ProductService);

  try {
    const products = await productService.getCategory();
    console.log(products);
  } catch (error) {
    console.error(error);
  } finally {
    await app.close();
  }
}

bootstrap();
