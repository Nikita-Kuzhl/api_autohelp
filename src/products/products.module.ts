import { AuthModule } from './../auth/auth.module';
import { FilesModule } from './../files/files.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './products.model';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [SequelizeModule.forFeature([Product]),FilesModule,AuthModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[ProductsService]
})
export class ProductsModule {}
