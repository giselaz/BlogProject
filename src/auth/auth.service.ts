import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/user/dtos/user.dto';
import { stringify } from 'querystring';
import { LoginDto } from 'src/user/dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: Partial<UserDto>) {
    // password email check
    const payload = (await this.validateUser(user)) || {};

    return {
      accses_token: this.jwtService.sign({
        ...payload,
      }),
    };
  }
  async validateUser(user: Partial<UserDto>): Promise<Partial<LoginDto>> {
    const dbUser = await this.userService.findOne({ email: user.email });

    if (dbUser && bcrypt.compareSync(user.password, dbUser.password)) {
      delete dbUser.password;
      const Userlog = {
        id: dbUser.id,
        email: dbUser.email,
        password: dbUser.password,
        roles: dbUser.roles.name,
      };
      return Userlog;
    } else throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
  }
}

// async validateUser({ email, password }: Partial<UserDto>) {
//   const user = await this.userService.findOne({ email: email });
//   if (!user) {
//     throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
//   }
//   return bcrypt.compareSync(password, user.password);
// }
