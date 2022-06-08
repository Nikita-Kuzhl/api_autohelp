import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { SubCategory } from './subcategory.model';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { SubcategoryService } from './subcategory.service';
@ApiTags('Подкатегории')
@Controller('/subcategory')
export class SubcategoryController {
  constructor(private subcategoryService: SubcategoryService) {}
  @ApiOperation({ summary: 'Создание категории' })
  @ApiResponse({ status: 200, type: SubCategory })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/add')
  addCategory(@Body() dto: CreateSubCategoryDto) {
    return this.subcategoryService.create(dto);
  }
  @ApiOperation({ summary: 'Получение всех категорий' })
  @ApiResponse({ status: 200, type: SubCategory })
  @Get('/')
  getAll() {
    return this.subcategoryService.getAll();
  }
  @ApiOperation({ summary: 'Получение категории по параметру' })
  @ApiResponse({ status: 200, type: [SubCategory] })
  @Get('/:id')
  getByValue(@Param('id') id: number): Promise<SubCategory> {
    return this.subcategoryService.getCatByValue(id);
  }
}
