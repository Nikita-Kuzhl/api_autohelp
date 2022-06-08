import { ApiProperty } from '@nestjs/swagger';
export class CreateCategoryDto {
  @ApiProperty({ example: 'Шлифовка' })
  readonly name: string;
  @ApiProperty({ example: 'Бла бла' })
  readonly description: string;
  @ApiProperty({ example: 'image', type: 'file' })
  readonly image: any;
  @ApiProperty({ example: '1' })
  readonly subcategoryId: number;
}
