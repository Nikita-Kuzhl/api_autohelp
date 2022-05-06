import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto{
  @ApiProperty({example:"staff"})
  readonly value: string;
  @ApiProperty({example:"Получение работы"})
  readonly description: string;
}