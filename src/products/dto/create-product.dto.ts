import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
  @ApiProperty({example:'Сварка покрышек'})
  readonly name: string;
  @ApiProperty({example:'Бла бла'})
  readonly description: string;
  @ApiProperty({example:'123123'})
  readonly price: number;
  @ApiProperty({example:'8 часов'})
  readonly time: string;
  @ApiProperty({example:'123123',type:'file'})
  readonly image:any;
  @ApiProperty({example:'1'})
  readonly categoryId:number;
}