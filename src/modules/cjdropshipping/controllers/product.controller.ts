import { Body, Controller, Get, Post } from '@nestjs/common';
import { DropshippingService } from '../services/dropshipping.service';
import { CreateOrderDto } from '../dto/create-order';

@Controller('product')
export class ProductController {
  constructor(private readonly dropshippingService: DropshippingService) {}

  @Get('list')
  listProduct() {
    return this.dropshippingService.listProdduct();
  }

  @Post('create-order')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.dropshippingService.createOrder(createOrderDto);
  }
}
