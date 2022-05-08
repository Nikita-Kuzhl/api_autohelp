import { ApiProperty } from '@nestjs/swagger';
export class AddCartDto{
  @ApiProperty({example:'1'})
  readonly userId:number;
  @ApiProperty({example:'1'})
  readonly productId:number;
}