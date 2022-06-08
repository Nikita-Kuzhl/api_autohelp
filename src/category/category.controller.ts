import { Category } from './category.model';
import { RolesGuard } from './../auth/role.guard';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Категории')
@Controller('/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @ApiOperation({ summary: 'Создание категории' })
  @ApiResponse({ status: 200, type: Category })
  @ApiConsumes('multipart/form-data')
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  addCategory(@Body() dto: CreateCategoryDto, @UploadedFile() image: any) {
    return this.categoryService.create(dto, image);
  }
  @ApiOperation({ summary: 'Получение всех категорий' })
  @ApiResponse({ status: 200, type: Category })
  @Get('/')
  getAll() {
    return this.categoryService.getAll();
  }
  @ApiOperation({ summary: 'Получение категории по параметру' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get('/:id')
  getByValue(@Param('id') id: number): Promise<Category> {
    return this.categoryService.getCatByValue(id);
  }
  @ApiOperation({ summary: 'Получение категории по подкатегории' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get('/subcat/:id')
  getBySubCatValue(@Param('id') id: number): Promise<Category[]> {
    return this.categoryService.getCatBySubCatValue(id);
  }
}
