import { Role } from './roles.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create_role.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }
  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    if (!role)
      throw new HttpException(
        'Такой роли не существует',
        HttpStatus.BAD_REQUEST,
      );
    return role;
  }
  async getAllRoles() {
    const roles = await this.roleRepository.findAll();
    return roles;
  }
}
