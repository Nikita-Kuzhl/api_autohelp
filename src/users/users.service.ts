import { RolesService } from './../roles/roles.service';
import { Op } from 'sequelize/types';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './users.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,private roleService:RolesService) {}
  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('user')
    await user.$set('roles',[user.roleId])
    user.roles = role
    return user;
  }
  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }
  async getUserByTelephone(telephone: string) {
    // const user = await this.userRepository.findOne({
    //   where: { [Op.or]: [{ telephone }, { email }] },
    //   include: { all: true },
    // });
    const user = await this.userRepository.findOne({
      where: {telephone},
      include: { all: true },
    });
    return user
  }
}
