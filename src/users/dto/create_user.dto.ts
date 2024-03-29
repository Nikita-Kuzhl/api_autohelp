import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';
export class CreateUserDto{
  @ApiProperty({example:'+79999999999'})
  @IsString({message:"Телефон должен быть стройкой"})
  @IsPhoneNumber('RU',{message:"Неверный формат телефона"})
  readonly telephone:string;
  @ApiProperty({example:'Виталий Бур'})
  @IsString({message:"Имя должен быть стройкой"})
  readonly name:string;
  @ApiProperty({example:'asd@asd.com'})
  @IsString({message:"Email должен быть стройкой"})
  @IsEmail({},{message:"Некоректный email"})
  readonly email:string;
  @ApiProperty({example:'123asd'})
  @IsString({message:"Пароль должен быть стройкой"})
  @Length(4,16,{message:'Некоректный пароль'})
  readonly password:string;
}