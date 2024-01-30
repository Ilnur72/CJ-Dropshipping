import { HttpModule } from '@nestjs/axios';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [HttpModule],
  controllers: [ProductController],
  providers: [ProductService, AuthService],
})
export class ProductModule {}
