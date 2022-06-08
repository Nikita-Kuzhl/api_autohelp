import { RolesGuard } from './../auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from './roles.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create_role.dto';
import { RolesService } from './roles.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

@ApiTags('Роль')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}
  @ApiOperation({ summary: 'Добавление роли' })
  @ApiResponse({ status: 200, type: [Role] })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/add')
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }
  @ApiOperation({ summary: 'Получение роли' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get(':value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
  @ApiOperation({ summary: 'Получение роли' })
  @ApiResponse({ status: 200, type: [Role] })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('/all')
  getAll() {
    return this.roleService.getAllRoles();
  }
}
