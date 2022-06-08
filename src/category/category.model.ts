import { SubCategory } from './../subcategory/subcategory.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

interface CreateCategoryAttr {
  name: string;
  description: string;
  image: string;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CreateCategoryAttr> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Шлифовка' })
  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @ApiProperty({ example: 'Бла бла' })
  @Column({ type: DataType.TEXT })
  description: string;

  @ApiProperty({ example: 'beb1ri3bib3.jpg' })
  @Column({ type: DataType.STRING })
  image: string;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => SubCategory)
  @Column(DataType.INTEGER)
  subcategoryId: number;

  @BelongsTo(() => SubCategory)
  category: SubCategory;
}
