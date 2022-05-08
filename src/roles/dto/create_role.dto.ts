import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto{
  @IsString({message:'Это строка'})
  @ApiProperty({example:"staff"})
  readonly value: string;
  @IsString({message:'Это строка'})
  @ApiProperty({example:"Получение работы"})
  readonly description: string;
}