import { Product } from 'src/products/products.model';
import { Cart } from './../cart/cart.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface CreateCartItemAttr {
  cartId: number;
  productId: number;
  repeat: number;
}

@Table({ tableName: 'cart_item' })
export class CartItem extends Model<CartItem, CreateCartItemAttr> {
  @ApiProperty({example:1})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({example:1})
  @Column({ type: DataType.INTEGER })
  repeat: number;

  @ApiProperty({example:1})
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;
  @BelongsTo(() => Product)
  products: Product;

  @ApiProperty({example:1})
  @ForeignKey(() => Cart)
  @Column({ type: DataType.INTEGER })
  cartId: number;
  @BelongsTo(() => Cart)
  cart: Cart;
}
