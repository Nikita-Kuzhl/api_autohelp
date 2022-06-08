import { ApiProperty } from '@nestjs/swagger';
import { Model, Table, Column, DataType } from 'sequelize-typescript';

interface CreateSubCategoryAttr {
  name: string;
}

@Table({ tableName: 'subcategory' })
export class SubCategory extends Model<SubCategory, CreateSubCategoryAttr> {
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
}
