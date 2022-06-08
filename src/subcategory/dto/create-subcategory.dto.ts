import { ApiProperty } from '@nestjs/swagger';
export class CreateSubCategoryDto {
  @ApiProperty({ example: 'Шлифовка' })
  readonly name: string;
}
