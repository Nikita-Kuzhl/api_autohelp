import { AuthModule } from './../auth/auth.module';
import { RolesModule } from './../roles/roles.module';
import { Role } from './../roles/roles.model';
import { User } from './users.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([User,Role]),RolesModule,forwardRef(()=>AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
