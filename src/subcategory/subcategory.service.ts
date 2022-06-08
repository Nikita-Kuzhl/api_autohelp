import { SubCategory } from './subcategory.model';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectModel(SubCategory) private categoryRepository: typeof SubCategory,
  ) {}
  async create(dto: CreateSubCategoryDto) {
    const subcategory = await this.categoryRepository.create(dto);
    return subcategory;
  }
  async getAll() {
    const subcategory = await this.categoryRepository.findAll();
    return subcategory;
  }
  async getCatByValue(id: number): Promise<SubCategory> {
    const subcategory = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!subcategory) {
      throw new HttpException(
        'Такой категории не существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    return subcategory;
  }
}
