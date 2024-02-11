import { IsArray, IsEmail, IsString } from 'class-validator';

export class productDto {
  @IsString()
  vid: string;

  @IsString()
  quantity: number;
}

export class CreateOrderDto {
  @IsString()
  orderNumber: string;

  @IsString()
  shippingZip: string;

  @IsString()
  shippingCountryCode: string;

  @IsString()
  shippingCountry: string;

  @IsString()
  shippingProvince: string;

  @IsString()
  shippingCity: string;

  shippingAddress: string;

  @IsString()
  shippingCustomerName: string;

  @IsString()
  shippingPhone: string;

  @IsString()
  remark: string;

  @IsString()
  fromCountryCode: string;

  logisticName: string;

  @IsString()
  houseNumber: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsArray()
  products: [productDto];
}
