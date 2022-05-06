import { AuthModule } from './../auth/auth.module';
import { FilesModule } from './../files/files.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [SequelizeModule.forFeature([Category]),FilesModule,AuthModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
