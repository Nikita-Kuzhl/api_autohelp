import { UpdateUserDto } from './dto/update_user.dto';
import { Role } from './../roles/roles.model';
import { RolesService } from './../roles/roles.service';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './users.model';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}
  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('user');
    await user.$set('roles', [user.roleId]);
    user.roles = role;
    return user;
  }
  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }
  async getUserByTelephone(telephone: string) {
    const user = await this.userRepository.findOne({
      where: { telephone },
      include: { all: true },
    });
    return user;
  }
  async getUserByToken(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: Role,
    });
    return user;
  }
  async delUser(id: number) {
    await this.userRepository.destroy({ where: { id } });
    return new HttpException('Ok', 200);
  }
  async updateUser(dto: UpdateUserDto, id: number) {
    await this.userRepository.update(dto, { where: { id: id } });
    return new HttpException('Ok', 200);
  }
}
