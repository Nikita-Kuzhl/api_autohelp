import { AuthModule } from './../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CartItemModule } from '../cart_item/cart-item.module';
import { UsersModule } from 'src/users/users.module';
import { Cart } from './cart.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [SequelizeModule.forFeature([Cart]), CartItemModule, AuthModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
