import { IsString, IsPhoneNumber, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LogInUserDto{
  @ApiProperty({example:'+79999999999'})
  @IsString({message:"Телефон должен быть стройкой"})
  @IsPhoneNumber('RU',{message:"Неверный формат телефона"})
  readonly telephone:string;

  @ApiProperty({example:'123asd'})
  @IsString({message:"Пароль должен быть стройкой"})
  @Length(4,16,{message:'Некоректный пароль'})
  readonly password:string;
}