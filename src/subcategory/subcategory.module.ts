import { AuthModule } from './../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubCategory } from './subcategory.model';
import { SubcategoryController } from './subcategory.controller';
import { SubcategoryService } from './subcategory.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [SequelizeModule.forFeature([SubCategory]), AuthModule],
  controllers: [SubcategoryController],
  providers: [SubcategoryService],
})
export class SubcategoryModule {}
