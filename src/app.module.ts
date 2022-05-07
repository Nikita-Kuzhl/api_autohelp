import { CartItem } from './cart_item/cart-item.model';
import { CartItemModule } from './cart_item/cart-item.module';
import { Cart } from './cart/cart.model';
import { CartModule } from './cart/cart.module';
import { Category } from './category/category.model';
import { CategoryModule } from './category/category.module';
import { FilesModule } from './files/files.module';
import { Product } from './products/products.model';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { Role } from './roles/roles.model';
import { RolesModule } from './roles/roles.module';
import { User } from './users/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    CartItemModule,
    CartModule,
    CategoryModule,
    FilesModule,
    ProductsModule,
    AuthModule,
    RolesModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Role, Product, Category, Cart,CartItem],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
  ],
})
export class AppModule {}
