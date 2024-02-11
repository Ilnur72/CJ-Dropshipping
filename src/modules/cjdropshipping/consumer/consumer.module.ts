import { ConsumerController } from './consumer.controller';
import { ConsumerService } from './consumer.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ConsumerController],
  providers: [ConsumerService],
})
export class ConsumerModule {}
