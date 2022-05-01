import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto{
  @ApiProperty({example:'+79999999999'})
  readonly telephone:string;
  @ApiProperty({example:'Виталий Бур'})
  readonly name:string;
  @ApiProperty({example:'asd@asd.com'})
  readonly email:string;
  @ApiProperty({example:'123'})
  readonly password:string;
}