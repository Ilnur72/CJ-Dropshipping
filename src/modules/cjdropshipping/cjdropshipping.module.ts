import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { DropshippingService } from './services/dropshipping.service';
import { ProductController } from './controllers/product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { TypesenseService } from './services/typesense.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'cjdropshipping_mq',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://localhost:5672`],
          queue: 'cjdropshipping_queue',
          noAck: true,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'TYPESENSE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://localhost:5672`],
          queue: 'typesense_queue',
          noAck: true,
        },
      },
    ]),
    HttpModule,
  ],
  controllers: [ProductController],
  providers: [DropshippingService, AuthService, TypesenseService],
})
export class CjdropshippingModule {}
