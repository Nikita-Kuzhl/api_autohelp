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

interface CreateCartItemAttr {
  cartId: number;
  productId: number;
  repeat: number;
}

@Table({ tableName: 'cart_item' })
export class CartItem extends Model<CartItem, CreateCartItemAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({ type: DataType.INTEGER })
  repeat: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;
  @BelongsTo(() => Product)
  products: Product;

  @ForeignKey(() => Cart)
  @Column({ type: DataType.INTEGER })
  cartId: number;
  @BelongsTo(() => Cart)
  cart: Cart;
}
