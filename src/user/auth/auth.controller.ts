import {
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from 'src/user/dtos/update-user.dto';
import { UserDto } from 'src/user/dtos/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuards } from './jwt-auth.guard';
@Controller('auth')
@Injectable()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  // vetem te dhena qe vine nga FE
  @Post('/login')
  loginUser(@Body() body: UserDto) {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuards)
  @Get('/renis')
  renis(@Req() req) {
    console.log(req.user);
    return {
      renis: 'renis',
    };
  }
  // @UseGuards(JwtAuthGuards)
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
