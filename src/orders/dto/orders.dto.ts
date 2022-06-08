import { Cart } from 'src/cart/cart.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: '22.06.2022 12:00' })
  readonly date: string;
  @ApiProperty({ example: 'Услуги' })
  products: Cart[];
  @ApiProperty({ example: '1000' })
  readonly price: number;
  @ApiProperty({ example: 1 })
  userId: string;
}
