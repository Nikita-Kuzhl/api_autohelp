import { User } from './../users/users.model';
import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
interface RoleCreationAttr {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttr> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'ADMIN' })
  @Column({ type: DataType.STRING, unique: true,allowNull:false })
  value: string;
  @ApiProperty({ example: 'Он может всё' })
  @Column({ type: DataType.STRING,allowNull:false })
  description: string;
  @HasMany(()=>User)
  roles:User[]

}
