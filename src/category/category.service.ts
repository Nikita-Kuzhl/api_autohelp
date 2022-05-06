import { CreateCategoryDto } from './dto/create-category.dto';
import { FilesService } from './../files/files.service';
import { Category } from './category.model';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryRepository: typeof Category,private filesService:FilesService){}
  async create(dto: CreateCategoryDto,image:any){
    const fileName = await this.filesService.createFile(image);
    const category = await this.categoryRepository.create({
      ...dto,
      image: fileName,
    });
    return category;
  }
  async getAll(){
    const category = await this.categoryRepository.findAll()
    return category
  }
  async getCatByValue(id:number):Promise<Category>{
    const category = await this.categoryRepository.findOne({where:{id}})
    if(!category){
      throw new HttpException('Такой категории не существует',HttpStatus.BAD_REQUEST)
    }
    return category
  }
}
