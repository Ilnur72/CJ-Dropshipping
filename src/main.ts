import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { IRabbitMQConfig } from './shared/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const options = configService.get<IRabbitMQConfig>('rabbitOption');
  
  const MQserver = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: options,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await MQserver.listen();
  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}
bootstrap();
