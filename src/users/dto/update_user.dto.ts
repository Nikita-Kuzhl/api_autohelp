import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty({ example: '+79999999999' })
  readonly telephone: string;
  @ApiProperty({ example: 'Виталий Бур' })
  readonly name: string;
  @ApiProperty({ example: 'asd@asd.com' })
  readonly email: string;
  @ApiProperty({ example: '+79999999999' })
  readonly roleId: number;
}
