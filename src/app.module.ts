import { ProductModule } from './modules/product/product.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './shared/core/core.modules';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ProductModule, CoreModule, AuthModule, HttpModule],
})
export class AppModule {}
