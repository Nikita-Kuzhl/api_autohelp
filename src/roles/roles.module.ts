import { AuthModule } from './../auth/auth.module';
import { Role } from './roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Module, forwardRef } from '@nestjs/common';

@Module({
  imports: [SequelizeModule.forFeature([Role]),forwardRef(()=>AuthModule)],
  controllers: [RolesController],
  providers: [RolesService],
  exports:[RolesService]
})
export class RolesModule {}
