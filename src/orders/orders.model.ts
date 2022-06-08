import { User } from './../users/users.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface CreateOrderAttr {
  date: string;
  products: string;
  userId: number;
}
export enum StatusOrdersType {
  New = 'Новый',
  Canceled = 'Отменён',
  Confirmed = 'Подтверждён',
  Completed = 'Выполнен',
}

@Table({ tableName: 'orders' })
export class Orders extends Model<Orders, CreateOrderAttr> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: '22.06.2022 12:00' })
  @Column({ type: DataType.STRING })
  date: string;
  @ApiProperty({ example: 'Услуги' })
  @Column({ type: DataType.TEXT })
  products: string;
  @ApiProperty({ example: '1000' })
  @Column(DataType.INTEGER)
  price: number;
  @ApiProperty({ example: 'Новый' })
  @Column({
    type: DataType.ENUM('Новый', 'Отменён', 'Подтверждён', 'Выполнен'),
    defaultValue: 'Новый',
  })
  status: StatusOrdersType;
  @ApiProperty({ example: 'Бла бла' })
  @Column({ type: DataType.TEXT, defaultValue: '' })
  comment: string;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
