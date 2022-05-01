import { Role } from './../roles/roles.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
interface UserCreationAttr {
  telephone: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttr> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'asd@asd.com' })
  @Column({ type: DataType.STRING, unique: true })
  email: string;
  @ApiProperty({ example: 'Виталий Бур' })
  @Column({ type: DataType.STRING })
  name: string;
  @ApiProperty({ example: '+7 999 999 99 99' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  telephone: string;
  @ApiProperty({ example: '1oek1dop1kdop1k' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @ForeignKey(() => Role)
  @Column({defaultValue:1})
  roleId: number;

  @BelongsTo(() => Role)
  roles: Role;
}
