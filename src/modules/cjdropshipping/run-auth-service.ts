import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { AuthService } from './services/auth.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const authService = app.get(AuthService);

  try {
    await authService.getAccessToken();
  } catch (error) {
    console.error(error);
  } finally {
    await app.close();
  }
}

bootstrap();
