import {
  Controller,
  Injectable,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtAuthGuards } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/role/role.enum';

@Controller('user')
@Injectable()
@Serialize(UserDto)
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/signup')
  async signup(@Body() body: CreateUserDto) {
    const user = this.userService.create(body);
    return user;
  }

  // @Get(':id')

  // getById(@Param('id')
  @UseGuards(JwtAuthGuards)
  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.userService.update(parseInt(id), body);
  }
}
