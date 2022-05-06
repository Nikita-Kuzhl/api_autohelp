import { Product } from 'src/products/products.model';
import { User } from './../users/users.model';
import { ApiProperty } from '@nestjs/swagger';
import { Model, Column, DataType, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';

interface CartCreationAttr{
  userId:number;
  productId:number;
}
@Table({tableName:'cart'})
export class Cart extends Model<Cart,CartCreationAttr>{
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({type:DataType.INTEGER})
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Product)
  @Column({type:DataType.INTEGER})
  productId: number;

  @BelongsTo(() => Product)
  products: Product;

}