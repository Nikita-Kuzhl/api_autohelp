import { Category } from './../category/category.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

interface ProductCreateAttr {
  name: string;
  description: string;
  price: number;
  image: string;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreateAttr> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Сварка покрышек' })
  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @ApiProperty({ example: 'Бла бла' })
  @Column({ type: DataType.STRING })
  description: string;

  @ApiProperty({ example: 123 })
  @Column({ type: DataType.INTEGER })
  price: number;

  @ApiProperty({ example: 'beb1ri3bib3.jpg' })
  @Column({ type: DataType.STRING })
  image: string;

  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
  categoryId: number;

  @BelongsTo(() => Category)
  products: Category;
}
