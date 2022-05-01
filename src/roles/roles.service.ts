import { Role } from './roles.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDyo } from './dto/create_role.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  async createRole(dto: CreateRoleDyo) {
    const role = await this.roleRepository.create(dto);
    return role;
  }
  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }
}
