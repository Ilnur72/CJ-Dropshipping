import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload,
} from '@nestjs/microservices';
import { ConsumerService } from './consumer.service';
@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @MessagePattern('product')
  public async executeProduct(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    try {
      const channel = context.getChannelRef();
      const orginalMessage = context.getMessage();
      await this.consumerService.saveProducts(data);
      channel.ack(orginalMessage);
    } catch (error) {
      console.log(error);
    }
  }
}
