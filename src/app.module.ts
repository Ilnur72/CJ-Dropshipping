import { Module } from '@nestjs/common';
import { CoreModule } from './shared/core/core.modules';
import { HttpModule } from '@nestjs/axios';
import { ConsumerModule } from './modules/cjdropshipping/consumer/consumer.module';
import { CjdropshippingModule } from './modules/cjdropshipping/cjdropshipping.module';

@Module({
  imports: [CjdropshippingModule, CoreModule, HttpModule, ConsumerModule],
})
export class AppModule {}
