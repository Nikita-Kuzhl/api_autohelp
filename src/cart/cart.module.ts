import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from './../products/products.module';
import { Cart } from './cart.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [SequelizeModule.forFeature([Cart]),ProductsModule,UsersModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
