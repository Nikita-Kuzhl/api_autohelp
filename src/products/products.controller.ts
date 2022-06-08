import { RolesGuard } from './../auth/role.guard';
import { Product } from './products.model';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
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
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';

@Controller('/product')
@ApiTags('Продукты')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @ApiOperation({ summary: 'Создание продукта' })
  @ApiResponse({ status: 200, type: Product })
  @ApiConsumes('multipart/form-data')
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/add')
  createProduct(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }
  @ApiOperation({ summary: 'Получение продуктов' })
  @ApiResponse({ status: 200, type: Product })
  @Get()
  getAllProduct() {
    return this.productService.getAll();
  }
  @ApiOperation({ summary: 'Получение продуктов по категории' })
  @ApiResponse({ status: 200, type: Product })
  @Get('cat/:id')
  getProductCat(@Param('id') id: number) {
    return this.productService.findAllCat(id);
  }
  @ApiOperation({ summary: 'Получение продукта по параметру' })
  @ApiResponse({ status: 200, type: Product })
  @Get(':id')
  getProduct(@Param('id') id: number) {
    return this.productService.findOne(id);
  }
}
