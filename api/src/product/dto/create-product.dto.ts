import { IsString, IsNumber, IsBoolean, IsArray } from 'class-validator';
import { Product } from '../../interfaces/product.interface';

export class CreateProductDto implements Partial<Product> {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsArray()
  @IsString({ each: true })
  options: string[];

  @IsBoolean()
  available: boolean;
}
