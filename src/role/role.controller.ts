import {
  Body,
  Controller,
  Delete,
  Injectable,
  Param,
  Post,
} from '@nestjs/common';
import { RoleEntity } from './role.entity';
import { RoleService } from './roles.service';

@Controller('role')
@Injectable()
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post('/newRole')
  async createRole(@Body() body: RoleEntity) {
    return await this.roleService.create(body.name);
  }

  @Delete('/:id')
  async deleteRole(@Param() id: string) {
    return await this.roleService.delete(parseInt(id));
  }
}
